@echo off
echo Checking MongoDB service status...
sc query MongoDB
echo.
echo If you see "RUNNING", MongoDB is ready!
echo If you see an error, MongoDB needs to be started.
echo.
pause
