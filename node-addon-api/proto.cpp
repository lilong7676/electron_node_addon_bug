//
// Created by lilonglong on 12/14/20.
//

#include "proto.h"
#include <iostream>

using namespace Napi;

#pragma mark - Proto::

static Napi::String Method(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "Hello, world!");
}

Napi::Object Proto::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func =
            DefineClass(env,
                        "Proto",{

                        });

    auto constructor = new Napi::FunctionReference();
    *constructor = Napi::Persistent(func);
    constructor->SuppressDestruct();
    env.SetInstanceData(constructor);
    exports.Set("Proto", func);
    exports.Set("hello", Napi::Function::New(env, Method));
    return exports;
}

Proto::Proto(const Napi::CallbackInfo &info) : ObjectWrap(info) {
    std::cout << "----------------- Proto constructor" << std::endl;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    return Proto::Init(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init);