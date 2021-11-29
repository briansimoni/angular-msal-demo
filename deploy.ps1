npm run-script build
Compress-Archive dist -DestinationPath angular-app -Update
Copy-VMFile ".NET Core Hosting" -SourcePath "angular-app.zip" -DestinationPath "C:\Users\Administrator\Desktop\angular-app.zip" -FileSource Host -CreateFullPath
$password = ConvertTo-SecureString "PassPhrase!1" -AsPlainText -Force
$Cred = New-Object System.Management.Automation.PSCredential ("Administrator", $password)
Invoke-Command -VMName ".NET Core Hosting"  -Credential $Cred -ScriptBlock { 
    Expand-Archive -Path "C:\Users\Administrator\Desktop\angular-app.zip" -DestinationPath "C:\inetpub\wwwroot\" -Force
    rm "C:\inetpub\wwwroot\example-ui\*"
    mv "C:\inetpub\wwwroot\dist\acat\*" "C:\inetpub\wwwroot\example-ui"
    rm "C:\Users\Administrator\Desktop\angular-app.zip"
}