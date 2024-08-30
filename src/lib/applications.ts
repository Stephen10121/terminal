export type Application = {
    description: string,
    trigger: (args: string[], flags: string[], display: (text: string) => void) => Promise<number>
}

async function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const applications: {[key: string]: Application} = {
    theme: {
        description: "cool thing",
        trigger: async (args, flags, display) => {
            display(`Args: ${args.join(",")}`);
            display(`Flags: ${flags.join(",")}`);
            await timeout(2000);
            display("Hello World3");
            return 1;
        }
    }
}