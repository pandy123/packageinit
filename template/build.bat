@echo off
tsc
cd types
set path=%cd%
for /R %%i in (*) do del %%i
cd ..

cd build
for /R %%i in (*.d.ts) do copy %%i %path%
cd ..


