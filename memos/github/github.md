```
curl -X GET -u "$USERNAME:$PERSONAL_ACCESS_TOKEN" -H "Time-Zone: Asia/Tokyo" https://api.github.com/repos/:user/:repos/issues\?state=all | \
   jq -r '.[] | if (.updated_at|fromdate) > now - (60 * 60 * 24 * 6) then .title = "- (" + .state + (if .pull_request == null then "-pr" else "-issue" end) + ") No." + (.number|tostring) + " " + .title + " " + .html_url else empty end | .title'
 ```
