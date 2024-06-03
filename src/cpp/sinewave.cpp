#include <cmath>
#include <emscripten.h>

const double frequency = 440;
const double sampleRate = 44100;
const double amplitude = 1;

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    void* malloc(size_t size) {
        return malloc(size);
    }

    EMSCRIPTEN_KEEPALIVE
    void free(void* ptr) {
        free(ptr);
    }

    EMSCRIPTEN_KEEPALIVE
    void generateSineWave(double frequency, double sampleRate, double amplitude, double time, float* samples) {
        int numberOfSamples = frequency * sampleRate;
        float timeStep = 1.0f / sampleRate;
        double angle = 2.0 * M_PI * frequency * time;
        for (int i = 0; i < numberOfSamples; ++i) {
            float t = i * timeStep;
            samples[i] = amplitude * std::sin(2 * M_PI * frequency * t);
        }
    }
}