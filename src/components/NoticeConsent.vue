<template>  
<v-layout row>
<v-flex xs12 sm10 offset-sm1 md8 offset-md2 elevation-2 class="pa-4 noselect" >
<h4>Notice and Consent Statement</h4>
<p>You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only. By using this IS (which includes any device attached to this IS), you consent to the following conditions: </p>
<ol>
<li>
  The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations. 
</li>
<li>
  At any time, the USG may inspect and seize data stored on this IS. 
</li>
<li>
  Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG authorized purpose. 
</li>
<li>
  This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy. 
</li>
<li>
  Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. 
</li>
</ol>
<v-btn primary @click="$emit('agreeClicked')">I Agree</v-btn>
</v-flex>
</v-layout>
</template>
<style scoped>
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>