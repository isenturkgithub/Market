# SLY Market Bot Sniper
Highlight suspected bots in the Star Atlas market website (https://play.staratlas.com/market/). Some users may prefer to avoid buying or selling to bots, so this tool makes it easier to identify bot accounts when browsing the Star Atlas market.

The list of accounts is gathered from the community and will not likely be maintained beyond initial release. The list can be updated by the individual user by modifying the `const botList = []` variable which starts on line 15.

## Setup
The script is built as a TamperMonkey script. TamperMonkey is a userscript manager available for free as a browser extension.
1.	Install TamperMonkey.
2.	Select the SLY_Market_Bot_Sniper.user.js file in this repo. View the file and click the "Raw" button to view its source.
3.	Copy the source.
4.	Open Tampermonkey in your browser and click the Add Script tab (icon with a plus symbol).
5.	Paste the source into the script window and click File > Save.
