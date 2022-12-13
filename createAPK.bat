@echo off
cd %~dp0
set /p versao="Digite a versao a ser gerada EX: 1.0.0: "

set /p modo="1 => Gerar Homologacao; 2 => Gerar Producao; 3 => Gerar Completo: "

rmdir /s /q "ApksRelease"
rmdir /s /q "android\app\src\main\jniLibs"
rmdir /s /q "android\app\build\outputs\apk\release"
rmdir /s /q "android\app\build\intermediates\transforms\mergeJniLibs\release"

if "%modo%" == "1" goto Homologacao

:Producao

start /w cmd.exe /c "cd android && gradlew.bat clean"
start /w cmd.exe /c "npx jetify && cd android && gradlew.bat assembleRelease"

xcopy "android\app\build\outputs\apk\release\app-release.apk" "ApksRelease\" /y /s

cd ApksRelease
rename "app-release.apk" "v-%versao%-Producao.apk"
cd..

rmdir /s /q "android\app\src\main\jniLibs"
rmdir /s /q "android\app\build\outputs\apk\release"
rmdir /s /q "android\app\build\intermediates\transforms\mergeJniLibs\release"

:Homologacao

if "%modo%" == "2" goto Exit

start /w cmd.exe /c "cd android && gradlew.bat clean"
start /w cmd.exe /c "npx jetify && cd android && gradlew.bat assembleRelease"

xcopy "android\app\build\outputs\apk\release\app-release.apk" "ApksRelease\" /y /s

cd ApksRelease
rename "app-release.apk" "v-%versao%-Homologacao.apk"
cd..

:Exit
exit