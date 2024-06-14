import gpio, { OUTPUT } from 'rpio';

import type { StepperPins } from '../types';

export class Stepper {
    pins: StepperPins;
    private stepperPins: StepperPins[] = [
        { "en1": 11, "en2": 22, "c1": 13, "c2": 15, "c3": 18, "c4": 16 },
        { "en1": 19, "en2": 32, "c1": 21, "c2": 23, "c3": 24, "c4": 26 }
    ];
    private setStep = (w1: 0 | 1, w2: 0 | 1, w3: 0 | 1, w4: 0 | 1) => {
        gpio.write(this.pins.c1, w1);
        gpio.write(this.pins.c2, w2);
        gpio.write(this.pins.c3, w3);
        gpio.write(this.pins.c4, w4);
    };
    constructor(motor: 0 | 1) {
        this.pins = this.stepperPins[motor];

        gpio.open(this.pins.en1, OUTPUT, gpio.HIGH);
        gpio.open(this.pins.en2, OUTPUT, gpio.HIGH);
        gpio.open(this.pins.c1, OUTPUT, gpio.LOW);
        gpio.open(this.pins.c2, OUTPUT, gpio.LOW);
        gpio.open(this.pins.c3, OUTPUT, gpio.LOW);
        gpio.open(this.pins.c4, OUTPUT, gpio.LOW);
    }
    forward = (delay: number, steps: number) => {
        return new Promise((resolve) => {
            for (let i = 0; i < steps; i++) {
                this.setStep(1, 0, 1, 0);
                Bun.sleepSync(delay);
                this.setStep(0, 1, 1, 0);
                Bun.sleepSync(delay);
                this.setStep(0, 1, 0, 1);
                Bun.sleepSync(delay);
                this.setStep(1, 0, 0, 1);
                Bun.sleepSync(delay);
            }
            resolve(true);
        });

    };
};


const stepper1 = new Stepper(0);