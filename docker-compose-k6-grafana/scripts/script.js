import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 100 },  // Ramp up to 100 VUs in 5 seconds
    { duration: '5m', target: 100 },  // Keep 100 VUs steady for 5 minutes
    { duration: '5s', target: 0 },    // Ramp down to 0 VUs in 5 seconds
  ],
};

export default function () {
  let res = http.get('https://test.k6.io');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
