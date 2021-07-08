### Filter lists

#### Ordening of filers 

New filter must be added on the top of each list. 

The reason is to provide an easy way to check whether a filter is still relevant. The filters at the end of the file will be the oldest filters, and also the most likely to maybe be obsolete. 

Old filters which are confirmed to still be required must be moved to the top of the list. 

**Note in addition to above: everything has to be in an *alphabetic* order!**

#### Issue number association 

**All** added filters must be associated with a formal issue number or date, example:

```
! https://github.com/JohnyP36/Personal-List/issues/7777 
||data.inertanceretinallaurel.com^  
! 2021-04-27  
||androidplanet.nl,iphoned.nl##.dynamic-content-native
```

This way this documents why a filter was added, and how to verify whether an old filter is still needed. The comment line preceding the filter(s) to solve a specific issue should be only a URL to the issue. The issue itself can contains all the details about how the issue was solved, and why it was solved this way, etc.

#### Commit message

Keep it simple. Put in the title box `A:` for adding a site, `C` for changing a rule, `R` for removing a rule. 
Put here after the site url. Example `mediamarkt.nl` ~~`https://www.mediamarkt.nl/view/`~~. At the end put the issue number. 

So `A: mediamarkt.nl fix #7`. The issue itself will contains all the details.

###### *[Resources Library](https://github.com/BPower0036/AdBlockFilters/issues/3)* and *[Wiki - Static filer Syntax](https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#scriptinject)*
