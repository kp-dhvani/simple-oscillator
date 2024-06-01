#include <emscripten.h>

#ifdef __cplusplus
#define EXTERN extern "C"
#else
#define EXTERN
#endif

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    int addNum(int a, int b) {
        return a + b;
    }
}