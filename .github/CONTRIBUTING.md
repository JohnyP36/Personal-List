### Filter lists

#### Ordening of filers 

New filter must be added on the top of each list. 

The reason is to provide an easy way to check whether a filter is still relevant. The filters at the end of the file will be the oldest filters, and also the most likely to maybe be obsolete. 

Old filters which are confirmed to still be required must be moved to the top of the list. 

**Note in addition to above: everything has to be in an *alphabetic* order!**

#### Issue number association 

**All** added filters must be associated with a formal issue number or date *(and only I have the right to break this rule)*, example:

```
! https://github.com/JohnyP36/Personal-List/issues/7777 
||data.inertanceretinallaurel.com^  
! 2021-04-27  
||androidplanet.nl,iphoned.nl##.dynamic-content-native
```

This way this documents why a filter was added, and how to verify whether an old filter is still needed. The comment line preceding the filter(s) to solve a specific issue should be only a URL to the issue. The issue itself can contains all the details about how the issue was solved, and why it was solved this way, etc.

#### Commit message

Keep it simple. 
 - Put in the title box `A:` for adding a site, `C` for changing a rule, `R` for removing a rule. Use `M` for moving a rule/rules to another part in the filterlist
 - Put here after the site url. Example `mediamarkt.nl` ~~`https://www.mediamarkt.nl/view/`~~. 
 - At the end put the issue number. 

So `A: mediamarkt.nl fix #7`. The issue itself will contains all the details.

##### How to know in which lists the rule(s) belong? 

- Block (general)      = *Algemene geblokkeerde netwerkfilters*
- Block 1p (server)    = *Advertentiedomeinen (die op server niveau geblokkeerd worden)*
- Block 3p (server)    = *Advertentiedomeinen (die als 3e partij geblokkeerd worden)*
- Block 1p (specific)  = *Specifieke Netwerkfilters / Advertentiedomeinen (die op server niveau geblokkeerd worden)*
- Block 3p (specific)  = *Specifieke Advertentiedomeinen (die als 3e partij geblokkeerd worden)*
- Block 1p (whitelist) = *Uitzonderingen netwerkfilters 1e partij*
- Block 3p (whitelist) = *Uitzonderingen netwerkfilters 3e partij*
- Hide (general)       = *Algemene verbergregels*
- Hide (specific)      = *Specifieke verbergregels*
- Hide (whitelist)     = *Uitzonderingen verbergregels*
- Anti-Adblock         = *Anti-AdBlock*
---
##### Wiki's which are very handy when making new rules
- *[Resources Library](https://github.com/BPower0036/AdBlockFilters/issues/3)* 
- *[Wiki - Static filer Syntax](https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#scriptinject)* 
- *[Wiki - Scriptlets (+js)](https://github.com/gorhill/uBlock/wiki/Resources-Library#defuser-scriptlets)*
- *[Regular Expressions (RegEx) syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet)*
