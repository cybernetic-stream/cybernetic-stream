| id                    | string    |                               |
|-----------------------|-----------|------------------------------------------|
| account               | string    | Account email address                    |
| account_guid          | string    | Globally unique identifier for account   |
| body                  | string    | Content of the message                   |
| date                  | timestamp | Date and time when the message was sent  |
| date_delivered        | null      | Delivery time of the message (if delivered) |
| date_edited           | null      | Time of the last edit (if edited)        |
| date_read             | null      | Time when the message was read (if read) |
| date_retracted        | null      | Time when the message was retracted (if retracted) |
| destination_caller_id | string    | Destination email address                |
| handle_id             | number    | Numeric identifier for the handle        |
| id_delivered          | number    | Indicator if the message was delivered (0 or 1) |
| is_from_me            | boolean   | True if the message is from the sender   |
| is_read               | boolean   | True if the message has been read        |
| is_sent               | boolean   | True if the message has been sent        |
| reply_to_guid         | string    | GUID of the message being replied to     |
| service               | string    | Messaging service used (e.g., iMessage)  |
