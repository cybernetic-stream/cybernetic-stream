# Fleet Drive State

|       id      |      string          |     VIN                                   |
|-------------|----------------|----------------------------------------|
| gps_as_of   | timestamp      | last GPS update as reorted by vehicle  |
| heading     | number         | degreees                               |
| lattitude   | number         |                                        |
| longitude   | number         |                                        |
| shift_state | string or null | e.g. D for drive R reverse null parked |
| speed       | number         | mph                                    |
