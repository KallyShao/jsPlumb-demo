export const data = {
  'id': '4000',
  'name': '功能测试',
  'status': 'enable',
  'varList': [

  ],
  'nodeList': [
    {
      'id': 'Start',
      'type': 'Root',
      'comment': '开始',
      'status': '1',
      'data': {
        'nextNode': 'Announce'
      },
      'top': 50,
      'left': 150
    },
    {
      'id': 'Announce',
      'type': 'Announce',
      'comment': '语音节点',
      'status': '1',
      'data': {
        'nextNode': 'WorkTime',
        'prompts': [
          {
            'type': 'VOX',
            'value': 'api/file/download/nosession/90247cf3-eb3b-455e-97dd-714e2df5b47a.mp3'
          }
        ]
      },
      'top': 178,
      'left': 131
    },
    {
      'id': 'WorkTime',
      'type': 'WorkTime',
      'comment': '',
      'status': '1',
      'data': {
        'weekDay': '1,2,3,4,5',
        'workTime': '08:00~16:00',
        'onWorkNode': 'Menu',
        'offWorkNode': 'Menu2',
        'mDays': [
          {
            'date': '',
            'type': 'onWork'
          },
          {
            'date': '',
            'type': 'offWork'
          }
        ]
      },
      'top': 305,
      'left': 85
    },
    {
      'id': 'Menu',
      'type': 'Menu',
      'comment': '',
      'status': '1',
      'data': {
        'nextNode': 'Exit',
        'prompts': [
          {
            'type': 'VOX',
            'value': 'api/file/download/nosession/.mp3'
          }
        ],
        'noinput': {
          'timeout': '',
          'threshold': '',
          'nextNode': 'Exit',
          'prompt': {
            'type': 'VOX',
            'value': 'api/file/download/nosession/.mp3'
          }
        },
        'nomatch': {
          'threshold': '',
          'nextNode': 'Exit',
          'prompt': {
            'type': 'VOX',
            'value': 'api/file/download/nosession/.mp3'
          }
        },
        'choices': [
          {
            'key': '1',
            'nextNode': 'Exit'
          },
          {
            'key': '2',
            'nextNode': 'Exit'
          },
          {
            'key': '3',
            'nextNode': 'Exit'
          }
        ]
      },
      'top': 499,
      'left': 281
    },
    {
      'id': 'Menu2',
      'type': 'Menu',
      'comment': '',
      'status': '1',
      'data': {
        'nextNode': 'Exit',
        'prompts': [
          {
            'type': 'VOX',
            'value': 'api/file/download/nosession/.mp3'
          }
        ],
        'noinput': {
          'timeout': '',
          'threshold': '',
          'nextNode': 'Exit',
          'prompt': {
            'type': 'VOX',
            'value': 'api/file/download/nosession/.mp3'
          }
        },
        'nomatch': {
          'threshold': '',
          'nextNode': 'Exit',
          'prompt': {
            'type': 'VOX',
            'value': 'api/file/download/nosession/.mp3'
          }
        },
        'choices': [
          {
            'key': '1',
            'nextNode': 'Exit'
          },
          {
            'key': '2',
            'nextNode': 'Announce'
          }
        ]
      },
      'top': 330,
      'left': 503
    },
    {
      'id': 'Exit',
      'type': 'Exit',
      'status': '1',
      'comment': '结束',
      'data': {

      },
      'top': 829,
      'left': 883
    }
  ]
};

export const nodeInfo = {
	"nodetypes" : {
		"vnf" : {
			"type" : "VNF",
			"properties" : [ {
				"name" : "id",
				"type" : "string",
				"required" : true
			}, {
				"name" : "vendor",
				"type" : "string",
				"required" : true
			}, {
				"name" : "version",
				"type" : "string",
				"required" : true
			}, {
				"name" : "packageName",
				"type" : "string",
				"required" : true
			}, {
				"name" : "productName",
				"type" : "string",
				"required" : false
			}, {
				"name" : "flavor",
				"type" : "string",
				"required" : false
			}, {
				"name" : "description",
				"type" : "string",
				"required" : false
			}, {
				"name" : "isScaleble",
				"type" : "boolean",
				"required" : false,
				"default" : false
			}, {
				"name" : "deploy_number",
				"type" : "integer",
				"required" : true,
				"default" : 1
			}, {
				"name" : "min_number_of_instances",
				"type" : "integer",
				"required" : false,
				"default" : 1
			}, {
				"name" : "max_number_of_instances",
				"type" : "integer",
				"required" : false,
				"default" : 1
			} ],
			"connections" : {
				"cps" : {
					"type" : "CP",
					"multiple" : true,
					"required" : false
				},
				"networks" : {
					"type" : "VL",
					"multiple" : true,
					"required" : false
				},
				"tap_service" : {
					"type" : "TapService",
					"required" : false,
					"description" : "required when need_tapaas is true"
				}
			}
		},
		"cp" : {
			"type" : "CP",
			"properties" : [ {
				"name" : "name",
				"type" : "string",
				"required" : true
			}, {
				"name" : "cpd_ref",
				"type" : "string",
				"required" : true,
				"description" : "ext cpd name"
			}, {
				"name" : "type",
				"type" : "string",
				"required" : false,
				"valid_values" : [ "VN", "VRF" ]
			}, {
				"name" : "description",
				"type" : "string",
				"required" : false,

			}, {
				"name" : "address",
				"type" : "string",
				"required" : false

			}, {
				"name" : "addressType",
				"type" : "string",
				"required" : false

			}, {
				"name" : "trunk_connectivity",
				"type" : "boolean",
				"required" : false,
				"default" : true

			}, {
				"name" : "trunk_port",
				"type" : "string",
				"required" : false,
				"description" : "required when trunk_connectivity is true",
				"valid_values" : [ "Parent", "Child" ]

			}, {
				"name" : "need_l3_connectivity",
				"type" : "boolean",
				"required" : false,
				"default" : true

			}, {
				"name" : "exist_bgpaas",
				"type" : "boolean",
				"required" : false,
				"default" : false
			}, {
				"name" : "exist_bgp_staticroute",
				"type" : "boolean",
				"required" : false,
				"default" : false
			}, {
				"name" : "exist_loopback_ip",
				"type" : "boolean",
				"required" : false,
				"default" : false
			}, {
				"name" : "exist_tapaas",
				"type" : "boolean",
				"required" : false,
				"default" : false
			} ],
			"connections" : {
				"network" : {
					"type" : "VL",
					"required" : true
				},
				"ecmp" : {
					"type" : "ECMP",
					"required" : false,
					"description" : "required when exist_loopbackip is true"
				},
				"bgp" : {
					"type" : "BGP",
					"required" : false,
					"description" : "required when exist_bgp is true"
				}
			}
		},
		"network" : {
			"type" : "VL",
			"properties" : [ {
				"name" : "name",
				"type" : "string",
				"required" : true
			}, {
				"name" : "vendor",
				"type" : "string",
				"required" : true,
				"description" : "name of the vendor who generate this VL"
			}, {
				"name" : "description",
				"type" : "string",
				"required" : false
			}, {
				"name" : "need_create",
				"type" : "boolean",
				"required" : true,
				"default" : true
			}, {
				"name" : "networkId",
				"type" : "string",
				"required" : false,
				"description" : "exist for external network",
				"inputable" : true
			}, {
				"name" : "connectivityType",
				"type" : "string",
				"required" : true,
				"description" : "such as 5GCoreNS"
			}, {
				"name" : "provider",
				"type" : "string",
				"required" : false
			}, {
				"name" : "version",
				"type" : "string",
				"required" : false
			}, {
				"name" : "admin_state_up",
				"type" : "boolean",
				"required" : false
			}, {
				"name" : "dns_domain",
				"type" : "string",
				"required" : false
			}, {
				"name" : "mtu",
				"type" : "integer",
				"required" : false,
				"inputable" : true
			}, {
				"name" : "port_security_enabled",
				"type" : "boolean",
				"required" : false
			}, {
				"name" : "network_type",
				"type" : "string",
				"required" : false,
				"valid_values" : [ "vxlan", "vlan", "flat" ]
			}, {
				"name" : "provider_physical_network",
				"type" : "string",
				"required" : false
			}, {
				"name" : "segmentation_id",
				"type" : "integer",
				"required" : false,
				"inputable" : true
			}, {
				"name" : "qos_policy_id",
				"type" : "string",
				"required" : false,
				"inputable" : true
			}, {
				"name" : "external_router",
				"type" : "boolean",
				"required" : false
			}, {
				"name" : "shared",
				"type" : "boolean",
				"required" : false
			}, {
				"name" : "vlan_transparent",
				"type" : "boolean",
				"required" : false
			}, {
				"name" : "is_default",
				"type" : "boolean",
				"required" : false
			}, {
				"name" : "availability_zone_hints",
				"type" : "array",
				"required" : false,
				"entry_schema" : "string",
				"inputable" : true
			}, {
				"name" : "segments",
				"type" : "array",
				"required" : false,
				"entry_schema" : "Segment",
				"inputable" : true
			}, {
				"name" : "isPublic",
				"type" : "boolean",
				"required" : true
			} ],
			"connections" : {
				"subnet" : {
					"type" : "Subnet",
					"required" : true,
					"multiple" : true
				},
				"vnfs" : {
					"type" : "VNF",
					"required" : false,
					"multiple" : true
				},
				"tap_flow" : {
					"type" : "TapFlow",
					"required" : false,
					"multiple" : true
				}
			}
		},
		"subnet" : {
			"type" : "Subnet",
			"properties" : [
					{
						"name" : "name",
						"type" : "string",
						"required" : true
					},
					{
						"name" : "description",
						"type" : "string",
						"required" : false
					},
					{
						"name" : "ip_version",
						"type" : "integer",
						"required" : true,
						"valid_values" : [ 4, 6 ],
						"inputable" : true
					},
					{
						"name" : "cidr",
						"type" : "string",
						"required" : true,
						"inputable" : true
					},
					{
						"name" : "subnetId",
						"type" : "string",
						"required" : false,
						"inputable" : true
					},
					{
						"name" : "enable_dhcp",
						"type" : "boolean",
						"required" : false,
						"default" : true
					},
					{
						"name" : "dns_nameservers",
						"type" : "array",
						"required" : false,
						"entry_schema" : "string"
					},
					{
						"name" : "allocation_pools",
						"type" : "array",
						"required" : false,
						"entry_schema" : "AllocationPool",
						"inputable" : true
					},
					{
						"name" : "host_routes",
						"type" : "array",
						"required" : false,
						"entry_schema" : "Route",
						"inputable" : true
					},
					{
						"name" : "gateway_ip",
						"type" : "string",
						"required" : false,
						"inputable" : true
					},
					{
						"name" : "prefixlen",
						"type" : "integer",
						"required" : false
					},
					{
						"name" : "ipv6_address_mode",
						"type" : "string",
						"required" : false
					},
					{
						"name" : "ipv6_ra_mode",
						"type" : "string",
						"required" : false,
						"valid_values" : [ "slaac", "dhcpv6-stateful",
								"dhcpv6-stateless" ]
					}, {
						"name" : "segment_id",
						"type" : "string",
						"required" : false,
						"inputable" : true
					}, {
						"name" : "subnetpool_id",
						"type" : "string",
						"required" : false
					}, {
						"name" : "use_default_subnetpool",
						"type" : "boolean",
						"required" : false
					}, {
						"name" : "service_types",
						"type" : "array",
						"required" : false,
						"entry_schema" : "string"
					}, {
						"name" : "dns_publish_fixed_ip",
						"type" : "boolean",
						"required" : false,
						"default" : false
					}, {
						"name" : "need_create",
						"type" : "boolean",
						"required" : true,
						"default" : true
					} ],
			"connections" : {
				"network" : {
					"type" : "VL",
					"required" : true
				},
				"router" : {
					"type" : "VR",
					"required" : false
				}
			}
		},
		"router" : {
			"type" : "VR",
			"properties" : [ {
				"name" : "name",
				"type" : "string",
				"required" : true
			}, {
				"name" : "description",
				"type" : "string",
				"required" : false
			}, {
				"name" : "routerId",
				"type" : "string",
				"required" : false,
				"description" : "input if don't need create",
				"inputable" : true
			}, {
				"name" : "admin_state_up",
				"type" : "boolean",
				"required" : false,
				"default" : true
			}, {
				"name" : "distributed",
				"type" : "boolean",
				"required" : false
			}, {
				"name" : "ha",
				"type" : "boolean",
				"required" : false
			}, {
				"name" : "availability_zone_hints",
				"type" : "array",
				"entry_schema" : "string",
				"required" : false
			}, {
				"name" : "service_type_id",
				"type" : "string",
				"required" : false
			}, {
				"name" : "flavor_id",
				"type" : "string",
				"required" : false
			}, {
				"name" : "external_gateway_info",
				"type" : "object",
				"required" : false,
				"entry_schema" : "ExternalGatewayInfo"
			}, {
				"name" : "native_routes",
				"type" : "array",
				"required" : false,
				"entry_schema" : "Route"
			}, {
				"name" : "additionalParamsForVr",
				"map" : "string",
				"required" : true
			}, {
				"name" : "need_create",
				"type" : "boolean",
				"required" : true,
				"default" : true
			}, {
				"name" : "isPublic",
				"type" : "string",
				"required" : true,
				"default" : true
			} ],
			"connections" : {
				"subnets" : {
					"type" : "Subnet",
					"required" : false,
					"multiple" : true
				},
				"vnfs" : {
					"type" : "VNF",
					"required" : false,
					"multiple" : true
				},
				"route" : {
					"type" : "StaticRoute",
					"required" : false,
					"multiple" : true
				}
			}
		},
		"static_route" : {
			"type" : "StaticRoute",
			"properties" : [],
			"connections" : {
				"router" : {
					"type" : "VL",
					"required" : true
				}
			}
		},
		"ecmp" : {
			"type" : "ECMP",
			"properties" : [],
			"connections" : {
				"router" : {
					"type" : "VR",
					"required" : true
				},
				"network" : {
					"type" : "VL",
					"required" : true
				}
			}
		},
		"bgp" : {
			"type" : "BGP",
			"properties" : [],
			"connections" : {
				"router" : {
					"type" : "VR",
					"required" : true
				},
				"exsubnet" : {
					"type" : "Subnet",
					"required" : false
				}
			}
		},
		"vpc" : {
			"type" : "VPC",
			"properties" : [],
			"connections" : {
				"local_router" : {
					"type" : "VR",
					"required" : true
				},
				"peer_router" : {
					"type" : "VR",
					"required" : true
				}
			}
		},
		"tap_service" : {
			"type" : "TapService",
			"properties" : [],
			"connections" : {
				"vnf" : {
					"type" : "VNF",
					"required" : true
				},
				"tap_flows" : {
					"type" : "TapFlow",
					"required" : true,
					"multiple" : true
				}
			}
		},
		"tap_flow" : {
			"type" : "TapFlow",
			"properties" : [],
			"connections" : {
				"tap_service" : {
					"type" : "TapService",
					"required" : true
				},
				"network" : {
					"type" : "VL",
					"required" : true
				}
			}
		}
	},
	"datatypes" : {
		"VnfProfile" : {
			"properties" : [ {
				"name" : "deploy_number",
				"type" : "integer",
				"required" : true,
				"default" : 1
			} ]
		},
		"Segment" : {
			"description" : "segments",
			"properties" : [ {
				"name" : "network_type",
				"type" : "string",
				"required" : true
			}, {
				"name" : "provider_physical_network",
				"type" : "string",
				"required" : true
			}, {
				"name" : "segmentation_id",
				"type" : "string",
				"required" : false
			} ]
		},
		"AllocationPool" : {
			"description" : "allocaion_pool",
			"properties" : [ {
				"name" : "start",
				"type" : "string",
				"required" : true
			}, {
				"name" : "end",
				"type" : "string",
				"required" : true
			} ]
		},
		"Route" : {
			"description" : "host_routes",
			"properties" : [ {
				"name" : "destination",
				"type" : "string",
				"required" : true
			}, {
				"name" : "nexthop",
				"type" : "string",
				"required" : true
			} ]
		},
		"ExternalGatewayInfo" : {
			"description" : "external gateway info of vRouter",
			"properties" : [ {
				"name" : "network",
				"type" : "string",
				"required" : true,
				"description" : "item id of external network"
			}, {
				"name" : "enable_snat",
				"type" : "boolean",
				"required" : true,
				"default" : false
			}, {
				"name" : "external_fixed_ips",
				"type" : "array",
				"required" : true,
				"entry_schema" : "ExternalFixedIp"
			} ]
		},
		"ExternalFixedIp" : {
			"properties" : [ {
				"name" : "subnet",
				"type" : "string",
				"required" : true,
				"description" : "subnet item id of external subnet"
			}, {
				"name" : "ip_address",
				"type" : "string",
				"required" : true,
				"inputalbe" : true
			} ]
		}
	}
};