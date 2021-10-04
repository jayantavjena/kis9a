| L   | Name         | Format | Function                    | Example Protocol  | Address Type |
| --- | ------------ | ------ | --------------------------- | ----------------- | ------------ |
| 1-  | Physical     | Bit    | Raw bits on physical medium | TIA-323-F, DOCSIS | N/A          |
| 2   | Data Link    | Frame  | Node-To-Node Communication  | MPLS              | MAC Address  |
| 3   | Network      | Packet | Routing and addressing      | IP, IGMP          | IP Address   |
| 4   | Transport    | PDU    | End-To-End Integrity        | TCP, UDP          | Port         |
| 5   | Session      | Data   | Connection Dialog           | SOCKS, RPC        | Socket       |
| 6   | Presentation | Data   | Data Representation         | XDR, SMB          | Hostname     |
| 7   | Application  | Data   | Interactions with user      | FTP               | Hostname     |

[GitHub - vald-phoenix/the-osi-model: The Open Systems Interconnection model (OSI model) compendium](https://github.com/vald-phoenix/the-osi-model)

Synonyms: TCP/IP model
