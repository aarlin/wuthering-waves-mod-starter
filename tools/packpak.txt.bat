@echo off
setlocal

:: 定义 Unrealpak.exe 的位置
:: Define the location of Unrealepak.exe
set "UnrealPakPath=UnrealPak"

:: 定义是否使用 压缩
set "UseCompress=false"

:: pak 位置默认为 bat 所在目录
set "PakPath=%~dp0"
set "PakPath=%PakPath:\=/%"

:: 拖入文件夹自动识别转换
set "Folder=%~1"
set "Folder=%Folder:\=/%"

:: 获取文件夹名作为 pak 的名字
for %%i in ("%Folder%") do set "PakName=%%~ni"

:: 创建一个临时的 txt 文件
if "%UseCompress%"=="true" (
    echo "%Folder%/*.*" "../../../*" -compress > %PakPath%\create.txt
) else (
    echo "%Folder%/*.*" "../../../*" > %PakPath%\create.txt
)

:: 虚幻引擎打包 pak 的代码
"%UnrealPakPath%" "%PakPath%%PakName%.pak" -create="%PakPath%create.txt"

:: 删除临时的 txt 文件
del create.txt

:: pause
endlocal
