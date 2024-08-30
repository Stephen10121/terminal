export type Application = {
    description: string,
    trigger: (args: string[], flags: string[], display: (text: string) => void) => Promise<number>
}

export const applications: {[key: string]: Application} = {
    theme: {
        description: "cool thing",
        trigger: async (args, flags, display) => {
            display(`Args: ${args.join(",")}`);
            display(`Flags: ${flags.join(",")}`);
            display("Hello World3");
            return 1;
        }
    }
}