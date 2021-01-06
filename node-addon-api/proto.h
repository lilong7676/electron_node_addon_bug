//
// Created by lilonglong on 12/14/20.
//

#ifndef NODE_ADDON_PROTO_H
#define NODE_ADDON_PROTO_H
#include <napi.h>

class Proto : public Napi::ObjectWrap<Proto> {
public:
    explicit Proto (const Napi::CallbackInfo &info);
    static Napi::Object Init(Napi::Env env, Napi::Object exports);

private:

};


#endif //NODE_ADDON_PROTO_H
