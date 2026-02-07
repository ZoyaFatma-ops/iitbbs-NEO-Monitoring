# Cosmic Watch API Spec (Draft)

Base URL: `/api`

## Auth
Auth is handled via Supabase on the frontend. Protected endpoints expect:
`Authorization: Bearer <supabase_access_token>`

## Endpoints

### Health
`GET /health`
Response:
```
{ "status": "ok", "service": "neo-monitoring-api", "timestamp": "...", "uptime": 123 }
```

### Current User
`GET /me` (protected)
Response:
```
{ "user": { "id": "...", "email": "...", ... } }
```

### NEO Feed
`GET /neos/feed?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`
Constraints: date range must be 7 days or less.
Response:
```
{
  "range": { "start_date": "2026-02-01", "end_date": "2026-02-07" },
  "total": 123,
  "neos": [
    {
      "id": "3542519",
      "name": "(2010 PK9)",
      "absolute_magnitude_h": 21.5,
      "is_potentially_hazardous": false,
      "diameter_m": 180.2,
      "close_approach_date": "2026-02-04",
      "miss_distance_km": 1420000.5,
      "relative_velocity_km_s": 12.4,
      "orbiting_body": "Earth",
      "risk": {
        "score": 38,
        "label": "Low",
        "factors": { "hazardous": false, "diameter_m": 180.2, "miss_distance_km": 1420000.5 }
      }
    }
  ]
}
```

### NEO Summary
`GET /neos/summary?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`
Response:
```
{
  "range": { "start_date": "2026-02-01", "end_date": "2026-02-07" },
  "total": 123,
  "hazardous": 7,
  "risk_breakdown": { "high": 2, "medium": 15, "low": 106 }
}
```

### NEO Lookup
`GET /neos/lookup/:id`
Response:
```
{
  "neo": { "...normalized fields..." },
  "raw": { "...full NASA NEO payload..." }
}
```

## Error Shape
All errors return:
```
{ "error": "Message", "code": "ERROR_CODE", "details": { ... } }
```

## Planned (Dashboard)
These are recommended based on the problem statement; not implemented yet:
```
GET /alerts
POST /alerts
GET /watchlist
POST /watchlist
DELETE /watchlist/:id
```
