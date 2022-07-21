
declare module "index" {
    export * as meow from 'meow';
}

declare module "meow" {
    export class Meow {
        /**
         * Main method.
         */
        public mainMethod(): void;

        /**
         * @part part1
         */
        public partMethod(): void;

        /**
         * @part part1
         */
        public static partMethodStatic(): void;

        /**
         * @part part1
         */
         public partProperty: number;

         /**
          * @part part1
          */
         public static partPropertyStatic: number;
    }
}