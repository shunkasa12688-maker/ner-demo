$WshShell = New-Object -ComObject WScript.Shell
$shortcut = $WshShell.CreateShortcut('C:\Users\shunk\OneDrive\Pictures\Desktop\NER Demo.lnk')
$shortcut.TargetPath = 'C:\Users\shunk\ner-demo'
$shortcut.IconLocation = 'C:\Windows\System32\imageres.dll,3'
$shortcut.Description = 'NER Capitalization Demo project folder'
$shortcut.Save()
Write-Output 'shortcut created'
