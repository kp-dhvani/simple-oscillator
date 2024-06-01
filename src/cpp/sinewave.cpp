#include <cmath>
#include <emscripten.h>

const double frequency = 440;
const double sampleRate = 44100;
const double amplitude = 1;

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    double generateSample(double time) {
        double angle = 2.0 * M_PI * frequency * time;
        double sample = amplitude * std::sin(angle);
        return sample;
    }
}