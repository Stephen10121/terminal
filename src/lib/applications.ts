import { browser } from "$app/environment";

export type Application = {
    description: string,
    trigger: (args: string[], flags: string[], print: (text: string) => void) => Promise<number>
}

async function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export type ApplicationsObject = {[key: string]: Application}

export const defaultApplications: ApplicationsObject = {
    test: {
        description: "Just an application to test all the features and stuff like that.",
        async trigger(args, flags, print) {

            if (args.includes("roll")) {
                print("Testing rickroll.");
                window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", '_blank')?.focus();
                return 0;
            }

            if (args.includes("website")) {
                if (browser) {
                        window.open("https://www.stephengruzin.dev/", '_blank')?.focus();
                }
            }

            return 0;
        },
    },
    open: {
        description: "This command opens up different links that I set up.",
        async trigger(args, flags, print) {
            if (args.includes("video")) {
                window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", '_blank')?.focus();
                return 0;
            }

            if (args.includes("website")) {
                window.open("https://www.stephengruzin.dev/", '_blank')?.focus();
                return 0;
            }

            if (args.includes("linkedin")) {
                window.open("https://www.linkedin.com/in/stephen-gruzin-6aba31204/", '_blank')?.focus();
                return 0;
            }

            if (args.includes("github")) {
                window.open("https://github.com/Stephen10121/terminal", '_blank')?.focus();
                return 0;
            }

            print(`To open a link in a new tab, do something like this: <span style="color:var(--blue-color);">'open github'</span>.<br>Links:<br><span style="color:var(--brightBlack-color);">github</span><br><span style="color:var(--blue-color);">linkedin</span><br><span style="color:var(--brightWhite-color);">website</span><br><span style="color:var(--red-color);">video</span>`);
            return 0;
        },
    }
}