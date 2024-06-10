@if "%~1"=="" goto skip

@setlocal enableextensions
@pushd %~dp0
@echo "%~1\*.*" "..\..\..\*.*" >filelist.txt
.\UnrealPak.exe "D:\Games\Wuthering Waves\Wuthering Waves Game\Client\Content\Paks\~mod\%~nx1.pak" -create=filelist.txt -compress
@popd
@pause

:skip