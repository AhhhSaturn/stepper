
declare module "*.py" {
    export class Stepper {
        constructor(motor: 'STEPPER1' | 'STEPPER2');
        stop();
        forward(delay: number, steps: number);
        backward(delay: number, steps: number);
    }
    export class Arrow {
        constructor(direction: 1 | 2 | 3 | 4);
        on();
        off();
    }
}