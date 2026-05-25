import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { ROOT, SEVERITY } from '../constants.mjs';

/**
 * Cross-platform process runner (no shell-specific commands).
 * @param {string} command
 * @param {string[]} args
 * @param {{ cwd?: string }} [options]
 */
export function runProcess(command, args, options = {}) {
  const cwd = options.cwd ?? ROOT;
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: false,
      env: { ...process.env, CI: process.env.CI ?? '1' },
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

function nxArgs(target, project) {
  const nxJs = join(ROOT, 'node_modules', 'nx', 'bin', 'nx.js');
  return [nxJs, 'run', `${project}:${target}`];
}

/**
 * @param {import('../report.mjs').VerificationReport} report
 * @param {{ withE2e?: boolean, skipBuild?: boolean }} options
 */
export async function runNxGates(report, { withE2e = false, skipBuild = false } = {}) {
  const node = process.execPath;
  const project = '@omnifex/ui-components';

  const gates = [
    { target: 'stylelint', label: 'stylelint (tokens, mobile-first, hex)' },
    { target: 'audit', label: 'CSS audit script', extra: [] },
    { target: 'test', label: 'unit tests (Jest/Stencil)' },
  ];

  if (!skipBuild) {
    gates.push({ target: 'build', label: 'Stencil build + publish layout' });
  }

  for (const gate of gates) {
    const args =
      gate.target === 'audit'
        ? [
            join(ROOT, 'tools', 'scripts', 'audit-ui-components.mjs'),
            '--fail-on-error',
          ]
        : nxArgs(gate.target, project);

    const cmd = gate.target === 'audit' ? node : node;
    const runArgs = gate.target === 'audit' ? args : args;

    console.log(`\n▶ ${gate.label}\n`);
    try {
      await runProcess(cmd, runArgs, { cwd: ROOT });
    } catch (err) {
      report.add({
        id: 'library',
        severity: SEVERITY.ERROR,
        category: 'nx',
        message: `Failed: ${gate.label}`,
        hint: String(err.message ?? err),
      });
    }
  }

  if (withE2e) {
    const e2eGates = [
      { project: 'angular-app-e2e', target: 'e2e:a11y', label: 'axe WCAG 2.2 AA (Angular)' },
      {
        project: 'angular-app-e2e',
        target: 'e2e:responsive',
        label: 'responsive viewports (Angular)',
      },
      { project: 'angular-app-e2e', target: 'e2e:touch', label: '44px touch targets (Angular)' },
    ];

    for (const gate of e2eGates) {
      console.log(`\n▶ ${gate.label}\n`);
      try {
        await runProcess(node, nxArgs(gate.target, gate.project), { cwd: ROOT });
      } catch (err) {
        report.add({
          id: 'library',
          severity: SEVERITY.ERROR,
          category: 'e2e',
          message: `Failed: ${gate.label}`,
          hint: String(err.message ?? err),
        });
      }
    }
  }
}
