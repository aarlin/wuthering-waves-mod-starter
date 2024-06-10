@if "%~1"=="" goto skip

@setlocal enableextensions
@pushd %~dp0
@echo "%~1\*.*" "..\..\..\*.*" >filelist.txt
.\UnrealPak.exe "..\..\~mod\%~nx1.pak" -create=filelist.txt
@popd
@pause

:skip
