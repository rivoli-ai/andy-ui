import { bootstrapApplication } from "@angular/platform-browser";
// Importing from the package registers every <andy-*> custom element.
import { initTheme } from "@andy-ui/angular";
import { AppComponent } from "./app/app.component";

initTheme("light");

bootstrapApplication(AppComponent).catch((err) => console.error(err));
