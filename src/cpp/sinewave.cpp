#include <cmath>
#include <emscripten.h>

extern "C"
{
    EMSCRIPTEN_KEEPALIVE
    void *malloc(size_t size)
    {
        return malloc(size);
    }

    EMSCRIPTEN_KEEPALIVE
    void free(void *ptr)
    {
        free(ptr);
    }

    EMSCRIPTEN_KEEPALIVE
    void generateSineWave(double frequency, double sampleRate, double amplitude, float *samples, int numSamples)
    {
        double timeStep = 1.0 / sampleRate;
        for (int i = 0; i < numSamples; ++i)
        {
            float t = i * timeStep;
            samples[i] = amplitude * std::sin(2 * M_PI * frequency * t);
        }
    }
}