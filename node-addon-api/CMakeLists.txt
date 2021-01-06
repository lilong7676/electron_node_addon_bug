cmake_minimum_required(VERSION 3.9)
cmake_policy(SET CMP0042 NEW)
set (CMAKE_CXX_STANDARD 14)

project (build-node-addon-api-with-cmake)
include_directories(${CMAKE_JS_INC})
file(GLOB SOURCE_FILES "proto.cpp")
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC} proto.cpp proto.h)
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})

# Include N-API wrappers
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REGEX REPLACE "[\r\n\"]" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})

target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})

# define NPI_VERSION
add_definitions(-DNAPI_VERSION=7)


include_directories(./node_modules/node-addon-api)
if (APPLE)
    include_directories(/Users/lilonglong/.cmake-js/node-x64/v14.15.1/include/node/)
else()
    include_directories(C:/Users/lilonglong/.cmake-js/node-x64/v14.15.1/include/node)
endif()