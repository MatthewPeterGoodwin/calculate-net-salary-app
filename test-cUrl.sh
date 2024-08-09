curl -X POST http://localhost:3000/calculate-net-salary -H "Content-Type: application/json" -d '{"grossAnnualSalary": 100000}'
curl -X POST http://localhost:3000/calculate-net-salary -H "Content-Type: application/json" -d '{"grossAnnualSalary": 40000}'
curl -X POST http://localhost:3000/calculate-net-salary -H "Content-Type: application/json" -d '{"grossAnnualSalary": -5}'