const { supabase } = require('../lib/db');

const seedData = [
  {
    name: 'Salam_PROD',
    dev_name: 'Prod',
    group_name: 'PROD',
    notes: 'Host:IMP-PROSSOPER01.itc.local | IP:172.20.2.52 | OS:Oracle Linux 8.9 | User:opc | Namespaces: com,som',
    server_host: '172.20.2.52',
    server_user: 'ro-user',
    server_password: 'K!ngK0ng@#121',
    com_data: {
      consoleUrl: 'http://admin.prod.com.impact.itc.local/console',
      orderMgmtUrl: 'http://prod.com.impact.itc.local/OrderManagement/',
      orchestrationUrl: 'http://prod.com.impact.itc.local/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.14.45 Port:1521 Service:PRDCOMPDB.itc.local',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.prod.som.impact.itc.local/console',
      orderMgmtUrl: 'http://prod.som.impact.itc.local/OrderManagement/',
      orchestrationUrl: 'http://prod.som.impact.itc.local/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.14.45 Port:1521 Service:PRDSOMPDB.itc.local',
      logCommand: null,
    },
    host_entries: '#PROD(Salam)\n#172.20.10.153 admin.prod.som.impact.itc.local prod.som.impact.itc.local\n#172.20.10.153 admin.prod.com.impact.itc.local prod.com.impact.itc.local',
    other_info: 'Tunnelling: ssh -D 9997 -l ro-user 172.20.2.52',
  },
  {
    name: 'Salam_SIT01',
    dev_name: 'SIT01',
    group_name: 'SIT',
    notes: 'Namespaces:sit01com,sit01som | Pods: sit01com-salam-admin,sit01com-salam-ms1,sit01som-salam-admin,sit01som-salam-ms1',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.salam.sit01com.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.sit01com.osm.itc.local:32641/OrderManagement',
      orchestrationUrl: 'http://salam.sit01com.osm.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.8.13 Port:1521 Service:SIT1COMPDB.itc.local User:sys/root123',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.salam.sit01som.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.sit01som.osm.itc.local:32641/OrderManagement',
      orchestrationUrl: 'http://salam.sit01som.osm.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.8.13 Port:1521 Service:SIT1SOMPDB.itc.local User:sys/root123',
      logCommand: null,
    },
    host_entries: '#salam sit\n172.20.8.38 admin.salam.sit01som.osm.itc.local salam.sit01som.osm.itc.local admin.salam.sit01com.osm.itc.local salam.sit01com.osm.itc.local',
    other_info: 'Tunnelling: Not Required | T3:t3.salam.sit01com.osm.itc.local,t3.salam.sit01som.osm.itc.local',
  },
  {
    name: 'Salam_UAT',
    dev_name: 'UAT01',
    group_name: 'UAT',
    notes: 'Namespaces:comuat,somuat | Pods:com-uat-admin,com-uat-ms1,com-uat-ms2,som-uat-admin,som-uat-ms1,som-uat-ms2',
    server_host: '172.20.4.40',
    server_user: 'ro-user',
    server_password: 'Forgot Password Saved in Moboextreem so NP',
    com_data: {
      consoleUrl: 'http://admin.uat.comuat.impact.itc.local:32641/console',
      orderMgmtUrl: 'http://uat.comuat.impact.itc.local:32641/OrderManagement',
      orchestrationUrl: 'http://uat.comuat.impact.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.14.170 Port:1521 Service:UATCOMPDBNEW.itc.local User:sys/oracle',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.uat.somuat.impact.itc.local:32641/console/',
      orderMgmtUrl: 'http://uat.somuat.impact.itc.local:32641/OrderManagement',
      orchestrationUrl: 'http://uat.somuat.impact.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.14.170 Port:1521 Service:UATSOMPDBNEW.itc.local User:sys/oracle',
      logCommand: null,
    },
    host_entries: '#UAT(Salam)\n172.20.4.53 admin.uat.som.impact.itc.local uat.som.impact.itc.local\n172.20.4.53 admin.uat.com.impact.itc.local uat.com.impact.itc.local',
    other_info: 'Tunnelling: ssh -D 9999 -l ro-user 172.20.4.40 | T3:t3.salam.sit01com.osm.itc.local,t3.salam.sit01som.osm.itc.local',
  },
  {
    name: 'PREPROD',
    dev_name: 'PreProd',
    group_name: 'UAT',
    notes: 'Host:IMP-PPDOSSOPER01.itc.local | IP:172.20.4.124 | OS:Oracle Linux 8.10 | User:opc | Namespaces:compre,sompre',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.preprod.compre.impact.itc.local:32641/console',
      orderMgmtUrl: 'http://preprod.compre.impact.itc.local:32641/OrderManagement',
      orchestrationUrl: 'http://preprod.compre.impact.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.4.171 Port:1521 Service:PPDCOMPDBNEW.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.preprod.sompre.impact.itc.local:32641/console',
      orderMgmtUrl: 'http://preprod.sompre.impact.itc.local:32641/OrderManagement',
      orchestrationUrl: 'http://preprod.sompre.impact.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.4.171 Port:1521 Service:PPDSOMPDBNEW.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    host_entries: '#salam_pre-prod\n#172.20.4.145 admin.preprod.asap1.impact.itc.local admin.preprod.asap.impact.itc.local admin.preprod.ob.impact.itc.local\n#172.20.4.145 admin.preprod.som.impact.itc.local preprod.som.impact.itc.local admin.preprod.com.impact.itc.local preprod.com.impact.itc.local\n#172.20.4.145 admin.preprod.uim.impact.itc.local preprod.uim.impact.itc.local\n172.20.4.145 admin.preprod.sompre.impact.itc.local preprod.sompre.impact.itc.local\n172.20.4.145 admin.preprod.compre.impact.itc.local preprod.compre.impact.itc.local',
    other_info: 'Tunnelling: Not Required | Pods:com-preprod-admin,com-preprod-ms1,som-preprod-admin,som-preprod-ms1 | T3:t3.preprod.compre.osm.itc.local,t3.preprod.sompre.impact.itc.local',
  },
  {
    name: 'R5/6 UAT',
    dev_name: 'dev03',
    group_name: 'UAT',
    notes: 'Unix:ossdev3 | HostIP:172.20.6.54 | Namespaces:dev03com,dev03som',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.salam.dev03com.osm.itc.local:32649/console',
      orderMgmtUrl: 'http://salam.dev03com.osm.itc.local:32649/OrderManagement',
      orchestrationUrl: 'http://salam.dev03com.osm.itc.local:32649/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.6.54 Port:1521 Service:DEV3COMPDB.itc.local User:sys/root123 Schema:osmschema/root123',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.salam.dev03som.osm.itc.local:32649/console',
      orderMgmtUrl: 'http://salam.dev03som.osm.itc.local:32649/OrderManagement',
      orchestrationUrl: 'http://salam.dev03som.osm.itc.local:32643/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.6.54 Port:1521 Service:DEV3SOMPDB.itc.local User:sys/root123 Schema:osmschema/root123',
      logCommand: null,
    },
    host_entries: '172.20.6.51 admin.salam.dev03com.osm.itc.local salam.dev03com.osm.itc.local salam.dev03com.osm.itc.local\n172.20.6.51 admin.salam.dev03som.osm.itc.local salam.dev03som.osm.itc.local salam.dev03som.osm.itc.local',
    other_info: 'Tunnelling: Not Required | Pods:dev03com-salam-admin,dev01com-salam-ms1,dev03som-salam-admin,dev03som-salam-ms1',
  },
  {
    name: 'UAT2',
    dev_name: 'dev02',
    group_name: 'UAT',
    notes: 'Host:imp-dvosskopr01.itc.local | IP:172.20.6.47 | OS:Oracle Linux 8.9 | User:ossuat2',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.salam.dev02com.osm.itc.local:32647/console',
      orderMgmtUrl: 'http://salam.dev02com.osm.itc.local:32647/OrderManagement',
      orchestrationUrl: 'http://salam.dev02com.osm.itc.local:32647/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.6.54 Port:1521 Service:DEV2COMPDB.itc.local Schema:osmschema/oracle',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.salam.dev02som.osm.itc.local:32647/console',
      orderMgmtUrl: 'http://salam.dev02som.osm.itc.local:32647/OrderManagement',
      orchestrationUrl: 'http://salam.dev02som.osm.itc.local:32647/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.6.54 Port:1521 Service:DEV2SOMPDB.itc.local Schema:osmschema/oracle',
      logCommand: null,
    },
    host_entries: '#R2_UAT\n172.20.6.49 admin.salam.dev02uim.uim.itc.local salam.dev02uim.uim.itc.local admin.dev2.asap.itc.local\n172.20.6.49 admin.salam.dev02som.osm.itc.local salam.dev02som.osm.itc.local admin.salam.dev02com.osm.itc.local salam.dev02com.osm.itc.local',
    other_info: 'Tunnelling: Not Required | Namespaces:dev02com,dev02som | T3:t3.salam.dev02com.osm.itc.local,t3.salam.sit02som.osm.itc.local',
  },
  {
    name: 'Salam_SIT02',
    dev_name: 'sit02',
    group_name: 'SIT',
    notes: 'Namespaces:sit02com,sit02som | Pods:sit02com-salam-admin,sit02com-salam-ms1,sit02som-salam-admin,sit02som-salam-ms1',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.salam.sit02com.osm.itc.local:32643/console',
      orderMgmtUrl: 'http://salam.sit02com.osm.itc.local:32643/OrderManagement',
      orchestrationUrl: 'http://salam.sit02com.osm.itc.local:32643/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.8.13 Port:1521 Service:SIT2COMPDB.itc.local User:sys/root123 Schema:osmschema/root123',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.salam.sit02som.osm.itc.local:32643/console',
      orderMgmtUrl: 'http://salam.sit02som.osm.itc.local:32643/OrderManagement',
      orchestrationUrl: 'http://salam.sit02som.osm.itc.local/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.8.13 Port:1521 Service:SIT2SOMPDB.itc.local User:sys/root123 Schema:osmschema/root123',
      logCommand: null,
    },
    host_entries: '#salam sit\n172.20.8.30 admin.salam.sit01som.osm.itc.local salam.sit01som.osm.itc.local admin.salam.sit01com.osm.itc.local salam.sit01com.osm.itc.local\n172.20.8.30 admin.salam.sit02som.osm.itc.local salam.sit02som.osm.itc.local admin.salam.sit02com.osm.itc.local salam.sit02com.osm.itc.local',
    other_info: 'Tunnelling: Not Required | T3:t3.salam.sit02com.osm.itc.local,t3.salam.sit02som.osm.itc.local',
  },
  {
    name: 'Salam_DEV14',
    dev_name: 'dev14',
    group_name: 'DEV',
    notes: 'Host:imp-dv14oper01.itc.local | IP:172.20.7.78 | OS:Oracle Linux 8.10 | User:oss-operator',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.salam.dev14com.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev14com.osm.itc.local:32641/osm',
      orchestrationUrl: 'http://salam.dev14com.osm.itc.local:32641/OrderManagement/orchestration/',
      dbInfo: 'Host:172.20.7.89 Port:1521 Service:DEV14COMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.salam.dev14som.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev14som.osm.itc.local:32641/osm',
      orchestrationUrl: 'http://salam.dev14som.osm.itc.local:32641/OrderManagement/orchestration/',
      dbInfo: 'Host:172.20.7.89 Port:1521 Service:DEV14SOMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    host_entries: '#dev14\n172.20.7.84 admin.salam.dev14com.osm.itc.local salam.dev14com.osm.itc.local admin.salam.dev14som.osm.itc.local salam.dev14som.osm.itc.local\n172.20.7.84 admin.salam.dev14uim.uim.itc.local salam.dev14uim.uim.itc.local admin.dev14.asap.itc.local',
    other_info: 'Tunnelling: Not Required | Namespaces:dev14com,dev14som | Helm:/app/oss/oracle/osm/7.4.1.0.20/cntk | T3:t3.salam.dev14com.osm.itc.local,t3.salam.dev14som.osm.itc.local',
  },
  {
    name: 'Salam_DEV15',
    dev_name: 'dev15',
    group_name: 'DEV',
    notes: 'Host:imp-dv15oper01.itc.local | IP:172.20.7.98 | OS:Oracle Linux 8.10 | User:oss-operator',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.salam.dev15com.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev15com.osm.itc.local:32641/osm',
      orchestrationUrl: 'http://salam.dev15com.osm.itc.local:32641/OrderManagement/orchestration/',
      dbInfo: 'Host:172.20.7.109 Port:1521 Service:DEV15COMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.salam.dev15som.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev15som.osm.itc.local:32641/osm',
      orchestrationUrl: 'http://salam.dev15som.osm.itc.local:32641/OrderManagement/orchestration/',
      dbInfo: 'Host:172.20.7.109 Port:1521 Service:DEV15SOMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    host_entries: '#dev15\n172.20.7.103 admin.salam.dev15com.osm.itc.local salam.dev15com.osm.itc.local admin.salam.dev15som.osm.itc.local salam.dev15som.osm.itc.local\n172.20.7.103 admin.salam.dev15uim.uim.itc.local salam.dev15uim.uim.itc.local admin.dev15.asap.itc.local',
    other_info: 'Tunnelling: Not Required | Namespaces:dev15com,dev15som | Helm:/app/oss/oracle/osm/7.4.1.0.20/cntk | T3:t3.salam.dev15com.osm.itc.local,t3.salam.dev14som.osm.itc.local',
  },
  {
    name: 'Salam_DEV04',
    dev_name: 'dev04',
    group_name: 'DEV',
    notes: 'Host:imp-tdvosskopr01.itc.local | IP:172.20.6.132 | OS:Oracle Linux 8.10 | User:opc',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.salam.dev04com.impact.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev04com.impact.itc.local:32641/OrderManagement/',
      orchestrationUrl: 'http://salam.dev04com.impact.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.6.108 Port:1521 Service:DEV4COMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.salam.dev04som.impact.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev04som.impact.itc.local:32641/OrderManagement/',
      orchestrationUrl: 'http://salam.dev04som.impact.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.6.108 Port:1521 Service:DEV4SOMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    host_entries: '#R4_Dev4\n172.20.6.134 admin.salam.dev04com.impact.itc.local salam.dev04com.impact.itc.local\n172.20.6.134 admin.salam.dev04som.impact.itc.local salam.dev04som.impact.itc.local',
    other_info: 'Tunnelling: Not Required | Namespaces:DVE04COM,DVE04SOM | Helm:/app/oracle/dev4/oss/cntk/quickstart | Pods:dev04com-salam-admin,dev04com-salam-ms1,dev04som-salam-admin,dev04som-salam-ms1 | T3:t3.salam.dev04com.osm.itc.local,t3.salam.dev04som.impact.itc.local',
  },
  {
    name: 'Salam_DEV05(R5/6 ST)',
    dev_name: 'dev05',
    group_name: 'ST',
    notes: 'Host:imp-tdvosskopr01.itc.local | IP:172.20.6.132 | OS:Oracle Linux 8.10 | User:opc',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.salam.dev05com.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev05com.osm.itc.local:32641/OrderManagement/',
      orchestrationUrl: 'http://salam.dev05com.osm.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.6.110 Port:1521 Service:DEV5COMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.salam.dev05som.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev05som.osm.itc.local:32641/OrderManagement/orchestration',
      orchestrationUrl: 'http://salam.dev05som.osm.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.6.110 Port:1521 Service:DEV5SOMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    host_entries: 'admin.salam.dev5com.osm.itc.local; admin.salam.dev5som.osm.itc.local',
    other_info: 'Tunnelling: Tunnel Required (127.0.0.1 host mapping) | Namespaces:DVE05COM,DVE05SOM | Helm:/app/oracle/dev5/oss/cntk/quickstart | Pods:dev05com-salam-admin,dev05com-salam-ms1,dev05som-salam-admin,dev05som-salam-ms1 | T3:t3.salam.dev05com.osm.itc.local,t3.salam.dev05som.osm.itc.local',
  },
  {
    name: 'Salam_DEV01(R5/6 SIT)',
    dev_name: 'dev01',
    group_name: 'SIT',
    notes: 'Host:imp-tdvosskopr01.itc.local | IP:172.20.6.132 | OS:Oracle Linux 8.10 | User:opc',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.salam.dev01com.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev01com.osm.itc.local:32641/OrderManagement',
      orchestrationUrl: 'http://salam.dev01com.osm.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.6.54 Port:1521 Service:COMPDBNEW.itc.local User:sys/root123 Schema:osmschema/root123',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.salam.dev01som.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev01som.osm.itc.local:32641/OrderManagement',
      orchestrationUrl: 'http://salam.dev01som.osm.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.6.54 Port:1521 Service:SOMPDBNEW.itc.local User:sys/root123 Schema:osmschema/root123',
      logCommand: null,
    },
    host_entries: '#R2_Dev01\n172.20.6.48 admin.salam.dev01com.osm.itc.local salam.dev01com.osm.itc.local\n172.20.6.48 admin.salam.dev01som.osm.itc.local salam.dev01som.osm.itc.local\n172.20.6.48 salam.dev01som.osm.itc.local admin.salam.dev01som.osm.itc.local t3.salam.dev01som.osm.itc.local',
    other_info: 'Tunnelling: Not Required | Namespaces:DVE05COM,DVE05SOM | Helm:/app/oracle/dev5/oss/cntk/quickstart | Pods:dev05com-salam-admin,dev05com-salam-ms1,dev05som-salam-admin,dev05som-salam-ms1 | T3:t3.salam.dev05com.osm.itc.local,t3.salam.dev05som.osm.itc.local',
  },
  {
    name: 'Salam_DEV11(R5/6 Migration)',
    dev_name: 'dev11',
    group_name: 'MIG',
    notes: 'Host:imp-dv11osskmas01.itc.local | IP:172.20.7.20 | OS:Oracle Linux 8.10 | User:opc',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.salam.dev11com.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev11com.sm.itc.local:32641/OrderManagement/',
      orchestrationUrl: 'http://salam.dev11com.osm.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.7.26 Port:1521 Service:DV11COMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.salam.dev11som.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev11som.sm.itc.local:32641/OrderManagement/',
      orchestrationUrl: 'http://salam.dev11som.osm.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.7.26 Port:1521 Service:DV11SOMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    host_entries: '#DEV11\n172.20.7.20 salam.dev11uim.uim.itc.local admin.salam.dev11uim.uim.itc.local admin.dv11.asap.itc.local salam.dev11com.osm.itc.local admin.salam.dev11com.osm.itc.local\n172.20.7.20 salam.dev11som.osm.itc.local admin.salam.dev11som.osm.itc.local\n\n172.20.7.20 admin.salam.dev11com.sm.itc.local salam.dev11com.sm.itc.local\n172.20.7.20 admin.salam.dev11som.sm.itc.local salam.dev11som.sm.itc.local\n172.20.7.20 salam.dev11som.sm.itc.local admin.salam.dev11som.sm.itc.local t3.salam.dev01som.sm.itc.local',
    other_info: 'Tunnelling: Not Required | Namespaces:DVE11COM,DVE11SOM | Helm:/app/oracle/osm/7.4.1.0.20/cntk/quickstart | Pods:dev11com-salam-admin,dev11com-salam-ms1,dev11som-salam-admin,dev11som-salam-ms1 | T3:t3.salam.dev11com.osm.itc.local,t3.salam.dev11som.osm.itc.local',
  },
  {
    name: 'Salam_DEV12',
    dev_name: 'dev12',
    group_name: 'DEV',
    notes: 'Host:IMP-DV12OPER01.itc.local | IP:172.20.7.65 | OS:Oracle Linux 8.10 | User:oss-operator',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.salam.dev12com.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev12com.osm.itc.local:32641/osm',
      orchestrationUrl: 'http://salam.dev12com.osm.itc.local:32641/OrderManagement/orchestration/',
      dbInfo: 'Host:172.20.7.50 Port:1521 Service:DEV12COMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.salam.dev12som.osm.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev12som.osm.itc.local:32641/osm',
      orchestrationUrl: 'http://salam.dev12som.osm.itc.local:32641/OrderManagement/orchestration/',
      dbInfo: 'Host:172.20.7.50 Port:1521 Service:DEV12SOMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    host_entries: '#dev12\n172.20.7.44 admin.salam.dev12com.osm.itc.local salam.dev12com.osm.itc.local admin.salam.dev12som.osm.itc.local salam.dev12som.osm.itc.local\n172.20.7.44 admin.salam.dev12uim.uim.itc.local salam.dev12uim.uim.itc.local admin.dev12.asap.itc.local',
    other_info: 'Tunnelling: Not Required | Namespaces:dev12com,dev12som | Helm:/app/oss/oracle/osm/cntk | Pods:dev12com-salam-admin,dev12com-salam-ms1,dev12som-salam-admin,dev12som-salam-ms1 | T3:t3.salam.dev12com.osm.itc.local,t3.salam.dev12som.osm.itc.local',
  },
  {
    name: 'Salam_DEV06',
    dev_name: 'dev06',
    group_name: 'DEV',
    notes: 'Host:imp-tdvosskopr01.itc.local | IP:172.20.6.132 | OS:Oracle Linux 8.10 | User:opc',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.salam.dev06com.impact.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev06com.osm.itc.local:32641/OrderManagement/',
      orchestrationUrl: 'http://salam.dev06com.osm.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.6.163 Port:1521 Service:DEV6COMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.salam.dev06som.impact.itc.local:32641/console',
      orderMgmtUrl: 'http://salam.dev06som.impact.itc.local:32641/OrderManagement/',
      orchestrationUrl: 'http://salam.dev06som.impact.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'Host:172.20.6.163 Port:1521 Service:DEV6SOMPDB.itc.local User:sys/oracle Schema:osmschema/oracle',
      logCommand: null,
    },
    host_entries: '#DEV06\n172.20.6.138 admin.salam.dev06com.impact.itc.local salam.dev06com.impact.itc.local\n172.20.6.138 admin.salam.dev06som.impact.itc.local salam.dev06som.impact.itc.local\n172.20.6.138 admin.salam.dev06uim.impact.itc.local salam.dev06uim.impact.itc.local\n172.20.6.138 admin.dev6.asap.itc.local',
    other_info: 'Tunnelling: Not Required | Namespaces:DVE06COM,DVE06SOM | Helm:/app/oracle/dev6/oss/cntk/quickstart | Pods:dev06com-salam-admin,dev06com-salam-ms1,dev06som-salam-admin,dev06som-salam-ms1 | T3:t3.salam.dev06com.osm.itc.local,t3.salam.dev06som.osm.itc.local',
  },
  {
    name: 'Salam_DR_PROD',
    dev_name: 'DR Prod',
    group_name: 'PROD',
    notes: 'VPN:Salam VPN | Socks:localhost:9999 | Pods:com-prod-ms1,com-prod-ms2,som-prod-ms1,som-prod-ms2',
    server_host: '172.24.2.52',
    server_user: 'ro-user',
    server_password: 'K!ngK0ng@#121',
    com_data: {
      consoleUrl: 'http://admin.prod.com.impact.itc.local:32641/console',
      orderMgmtUrl: 'http://prod.com.impact.itc.local:32641/OrderManagement',
      orchestrationUrl: 'http://prod.com.impact.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'DR Host:172.24.2.52 User:opc Logs:/u01/oracle/user_projects/domains/domain/servers/ms1/logs,/u01/oracle/user_projects/domains/domain/servers/ms2/logs',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.prod.som.impact.itc.local:32641/console',
      orderMgmtUrl: 'http://prod.som.impact.itc.local:32641/OrderManagement',
      orchestrationUrl: 'http://prod.som.impact.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'DR Host:172.24.2.52 User:opc Logs:/u01/oracle/user_projects/domains/domain/servers/ms1/logs,/u01/oracle/user_projects/domains/domain/servers/ms2/logs',
      logCommand: null,
    },
    host_entries: '#salam_dr\n#172.24.2.96 admin.prod.som.impact.itc.local prod.som.impact.itc.local\n#172.24.2.96 admin.prod.com.impact.itc.local prod.com.impact.itc.local\n172.24.2.53 admin.prod.som.impact.itc.local prod.som.impact.itc.local\n172.24.2.53 admin.prod.com.impact.itc.local prod.com.impact.itc.local',
    other_info: 'Tunnelling: Dynamic Tunnel ssh -D 9999 ro-user@172.24.2.52',
  },
  {
    name: 'MSDEV03',
    dev_name: 'dev03',
    group_name: 'DEV',
    notes: 'VPN:Salam VPN | Namespaces:dvms03com,dvms03som | Pods:dvms03com-dev03-ms1,dvms03som-dev03-ms1',
    server_host: '172.20.6.91',
    server_user: 'opc',
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.dev03.dvms03com.impact.itc.local:32641/console/',
      orderMgmtUrl: 'http://dev03.dvms03com.impact.itc.local:32641/OrderManagement/',
      orchestrationUrl: 'http://dev03.dvms03com.impact.itc.local:32641/OrderManagement/orchestration/',
      dbInfo: 'Log Server:172.20.6.90 User:opc Logs:user_projects/domains/domain/servers/ms1/logs',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.dev03.dvms03som.impact.itc.local:32641/console',
      orderMgmtUrl: 'http://dev03.dvms03som.impact.itc.local:32641/OrderManagement/',
      orchestrationUrl: 'http://dev03.dvms03som.impact.itc.local:32641/OrderManagement/orchestration/',
      dbInfo: 'Log Server:172.20.6.90 User:opc Logs:user_projects/domains/domain/servers/ms1/logs',
      logCommand: null,
    },
    host_entries: '#MS Teams\'s env\n172.20.6.91 admin.dev03.dvms03som.impact.itc.local dev03.dvms03som.impact.itc.local\n172.20.6.91 admin.dev03.dvms03com.impact.itc.local dev03.dvms03com.impact.itc.local',
    other_info: 'Tunnelling: Dynamic Tunnel ssh -D 9999 opc@172.20.6.91',
  },
  {
    name: 'MSSIT03',
    dev_name: 'sit03',
    group_name: 'SIT',
    notes: 'VPN:Salam VPN | Namespaces:qams03com,qams03som | Pods:qams03com-sit03-ms1,qams03som-sit03-ms1',
    server_host: '172.20.8.89',
    server_user: 'opc',
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.sit03.qams03com.impact.itc.local:32641/console/',
      orderMgmtUrl: 'http://sit03.qams03com.impact.itc.local:32641/OrderManagement/',
      orchestrationUrl: 'http://sit03.qams03com.impact.itc.local:32641/OrderManagement/orchestration/',
      dbInfo: 'Log Server:172.20.8.88 User:opc Logs:user_projects/domains/domain/servers/ms1/logs',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.sit03.qams03som.impact.itc.local:32641/console',
      orderMgmtUrl: 'http://sit03.qams03som.impact.itc.local:32641/OrderManagement/',
      orchestrationUrl: 'http://sit03.qams03som.impact.itc.local:32641/OrderManagement/orchestration/',
      dbInfo: 'Log Server:172.20.8.88 User:opc Logs:user_projects/domains/domain/servers/ms1/logs',
      logCommand: null,
    },
    host_entries: '#mssit03\n172.20.8.89 admin.sit03.qams03com.impact.itc.local sit03.qams03com.impact.itc.local\n172.20.8.89 admin.sit03.qams03som.impact.itc.local sit03.qams03som.impact.itc.local',
    other_info: 'Tunnelling: Dynamic Tunnel ssh -D 9999 opc@172.20.8.89',
  },
  {
    name: 'Oracle_DEV_QUICK',
    dev_name: 'quick',
    group_name: 'DEV',
    notes: 'KubeConfig:/home/opc/.kube/config_oss | Namespace:osm,som | AccessUser:opc',
    server_host: null,
    server_user: null,
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.quick.osm.osm.com:32556/console/',
      orderMgmtUrl: 'http://quick.osm.osm.com:32556/OrderManagement/',
      orchestrationUrl: 'http://quick.osm.osm.com:32556/OrderManagement/orchestration/',
      dbInfo: 'COM Pods:osm-quick-ms1 Logs:/u01/oracle/user_projects/domains/domain/servers/ms1/logs',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.quick.som.osm.com:32555/console/',
      orderMgmtUrl: 'http://quick.som.osm.com:32555/OrderManagement/',
      orchestrationUrl: 'http://quick.som.osm.com:32555/OrderManagement/orchestration/',
      dbInfo: 'SOM Pods:som-quick-ms1 Logs:/u01/oracle/user_projects/domains/domain/servers/ms1/logs',
      logCommand: null,
    },
    host_entries: '#com and som dev env\n100.76.200.247 admin.quick.osm.osm.com quick.osm.osm.com\n100.76.200.247 admin.quick.som.osm.com quick.som.osm.com\n100.76.200.142 admin.dev.com.osm.com dev.com.osm.com t3.dev.com.osm.com',
    other_info: 'Tunnelling: VPN + SSH phx-0208.snphxprshared1.gbucdsint02phx.oraclevcn.com | T3:t3.dev.com.osm.com',
  },
  {
    name: 'MSDEV04',
    dev_name: 'dev04',
    group_name: 'DEV',
    notes: 'Namespaces:dvms04com,dvms04som | T3:dev04.dvms04com.osm.itc.local,dev04.dvms04som.osm.itc.local',
    server_host: '172.20.6.93',
    server_user: 'opc',
    server_password: null,
    com_data: {
      consoleUrl: 'http://admin.dev04.dvms04com.impact.itc.local:32641/console/',
      orderMgmtUrl: 'http://dev04.dvms04com.impact.itc.local:32641/OrderManagement',
      orchestrationUrl: 'http://dev04.dvms04com.osm.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'COM Logs Server:172.20.6.90 User:ossmsdev4 Pods:dvms04com-dev04-ms1',
      logCommand: null,
    },
    som_data: {
      consoleUrl: 'http://admin.dev04.dvms04som.impact.itc.local:32641/console/',
      orderMgmtUrl: 'http://dev04.dvms04som.impact.itc.local:32641/OrderManagement',
      orchestrationUrl: 'http://dev04.dvms04som.osm.itc.local:32641/OrderManagement/orchestration',
      dbInfo: 'SOM Logs Server:172.20.6.90 User:ossmsdev4 Pods:dvms04som-dev04-ms1',
      logCommand: null,
    },
    host_entries: '#msdev04\n172.20.6.93 admin.dev04.dvms04som.impact.itc.local dev04.dvms04som.impact.itc.local\n172.20.6.93 admin.dev04.dvms04com.impact.itc.local dev04.dvms04com.impact.itc.local',
    other_info: 'Tunnelling: Tunnel ssh -D 9998 opc@172.20.6.93',
  },
];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!supabase) {
    return res.status(500).json({ error: 'Supabase is not configured.' });
  }

  try {
    const names = seedData.map((entry) => entry.name);

    const { data: existingRows, error: fetchError } = await supabase
      .from('environments')
      .select('id,name')
      .in('name', names);

    if (fetchError) throw fetchError;

    const existingByName = new Map((existingRows || []).map((row) => [row.name, row.id]));
    const rowsToUpdate = seedData.filter((entry) => existingByName.has(entry.name));
    const rowsToInsert = seedData.filter((entry) => !existingByName.has(entry.name));

    const updatedRows = [];

    for (const entry of rowsToUpdate) {
      const { data, error } = await supabase
        .from('environments')
        .update({
          ...entry,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingByName.get(entry.name))
        .select();

      if (error) throw error;
      if (data) updatedRows.push(...data);
    }

    let insertedRows = [];

    if (rowsToInsert.length > 0) {
      const { data, error } = await supabase
        .from('environments')
        .insert(rowsToInsert)
        .select();

      if (error) throw error;
      insertedRows = data || [];
    }

    const data = [...updatedRows, ...insertedRows];

    return res.status(200).json({ success: true, count: data.length });
  } catch (error) {
    console.error('Seed error:', error);
    return res.status(500).json({ error: 'Failed to seed environments.' });
  }
};