union

app('06de1ee5-cb59-4e56-9c55-28a2ff709d59').customEvents, //dpe-prod-ain-aue-001

app('3e73eecf-0d05-4a6c-8dfa-a36aaa94a451').customEvents, //dpe-prod-ain-jpe-001

app('d823e095-8426-491b-81d6-66a2de8be996').customEvents //dpe-prod-ain-weu-001

| where $__timeFilter(timestamp) and

cloud_RoleName == 'svc-OrderTimer'

and name has 'MaxKelsenEstimateEvaluation'

| extend market = tostring(customDimensions['Country Code'])

| filter market in ($countryCode)

| extend source = tostring(customDimensions['ReturnedResponse'])

| extend etaAks = todatetime(todynamic(tostring(customDimensions['EstimateResponse.AKS'])).EstimatedTime)

| extend etaAws = todatetime(todynamic(tostring(customDimensions['EstimateResponse.AWS'])).EstimatedTime)

| extend etaDiff = etaAks - etaAws

| extend predAks = todatetime(todynamic(tostring(customDimensions['EstimateResponse.AKS'])).PredictionTimeUTC)

| extend predAws = todatetime(todynamic(tostring(customDimensions['EstimateResponse.AWS'])).PredictionTimeUTC)

| extend predDiff = predAks - predAws

| project timestamp, market, source, etaDiff, etaAks, etaAws, predDiff, predAks, predAws

| summarize avgEtaDiff = avg(etaDiff) / 1s, avgPredDiff = avg(predDiff) / 1s by bin(timestamp, max_of(1h, $__interval))

| order by timestamp asc