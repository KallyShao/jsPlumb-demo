export const nodeTemplate = {
	"nodetypes": {
		"VNF": {
			"type": "VNF",
			"properties": [
				{
					"name": "id",
					"type": "string",
					"required": true
				},
				{
					"name": "vendor",
					"type": "string",
					"required": true
				},
				{
					"name": "version",
					"type": "string",
					"required": true
				},
				{
					"name": "packageName",
					"type": "string",
					"required": true
				},
				{
					"name": "productName",
					"type": "string",
					"required": false
				},
				{
					"name": "flavor",
					"type": "string",
					"required": false
				},
				{
					"name": "description",
					"type": "string",
					"required": false
				},
				{
					"name": "isScaleble",
					"type": "boolean",
					"required": false,
					"default": false
				},
				{
					"name": "deploy_number",
					"type": "integer",
					"required": true,
					"default": 1
				},
				{
					"name": "min_number_of_instances",
					"type": "integer",
					"required": false,
					"default": 1
				},
				{
					"name": "max_number_of_instances",
					"type": "integer",
					"required": false,
					"default": 1
				}
			],
			"connections": {
				"CP": {
					"multiple": true,
					"required": false
				},
				"Network": {
					"multiple": true,
					"required": false
				},
				"TapService": {
					"required": false,
					"description": "requiredwhenneed_tapaasistrue"
				}
			}
		},
		"CP": {
			"type": "CP",
			"properties": [
				{
					"type": "string",
					"required": true
				},
				{
					"name": "cpd_ref",
					"type": "string",
					"required": true,
					"description": "extcpdname"
				},
				{
					"name": "type",
					"type": "string",
					"required": false,
					"valid_values": [
						"VN",
						"VRF"
					]
				},
				{
					"name": "description",
					"type": "string",
					"required": false
				},
				{
					"name": "address",
					"type": "string",
					"required": false
				},
				{
					"name": "addressType",
					"type": "string",
					"required": false
				},
				{
					"name": "trunk_connectivity",
					"type": "boolean",
					"required": false,
					"default": true
				},
				{
					"name": "trunk_port",
					"type": "string",
					"required": false,
					"description": "requiredwhentrunk_connectivityistrue",
					"valid_values": [
						"Parent",
						"Child"
					]
				},
				{
					"name": "need_l3_connectivity",
					"type": "boolean",
					"required": false,
					"default": true
				},
				{
					"name": "exist_bgpaas",
					"type": "boolean",
					"required": false,
					"default": false
				},
				{
					"name": "exist_bgp_staticroute",
					"type": "boolean",
					"required": false,
					"default": false
				},
				{
					"name": "exist_loopback_ip",
					"type": "boolean",
					"required": false,
					"default": false
				},
				{
					"name": "exist_tapaas",
					"type": "boolean",
					"required": false,
					"default": false
				}
			],
			"connections": {
				"Network": {
					"required": true
				},
				"ECMP": {
					"required": false,
					"description": "requiredwhenexist_loopbackipistrue"
				},
				"BGP": {
					"required": false,
					"description": "requiredwhenexist_bgpistrue"
				},
				"TapFlow": {
					"required": false
				}
			}
		},
		"Network": {
			"type": "Network",
			"properties": [
				{
					"name": "name",
					"type": "string",
					"required": true
				},
				{
					"name": "vendor",
					"type": "string",
					"required": true,
					"description": "nameofthevendorwhogeneratethisVL"
				},
				{
					"name": "description",
					"type": "string",
					"required": false
				},
				{
					"name": "need_create",
					"type": "boolean",
					"required": true,
					"default": true
				},
				{
					"name": "networkId",
					"type": "string",
					"required": false,
					"description": "existforexternalnetwork",
					"inputable": true
				},
				{
					"name": "connectivityType",
					"type": "string",
					"required": true,
					"description": "suchas5GCoreNS"
				},
				{
					"name": "provider",
					"type": "string",
					"required": false
				},
				{
					"name": "version",
					"type": "string",
					"required": false
				},
				{
					"name": "admin_state_up",
					"type": "boolean",
					"required": false
				},
				{
					"name": "dns_domain",
					"type": "string",
					"required": false
				},
				{
					"name": "mtu",
					"type": "integer",
					"required": false,
					"inputable": true
				},
				{
					"name": "port_security_enabled",
					"type": "boolean",
					"required": false
				},
				{
					"name": "network_type",
					"type": "string",
					"required": false,
					"valid_values": [
						"vxlan",
						"vlan",
						"flat"
					]
				},
				{
					"name": "provider_physical_network",
					"type": "string",
					"required": false
				},
				{
					"name": "segmentation_id",
					"type": "integer",
					"required": false,
					"inputable": true
				},
				{
					"name": "qos_policy_id",
					"type": "string",
					"required": false,
					"inputable": true
				},
				{
					"name": "external_router",
					"type": "boolean",
					"required": false
				},
				{
					"name": "shared",
					"type": "boolean",
					"required": false
				},
				{
					"name": "vlan_transparent",
					"type": "boolean",
					"required": false
				},
				{
					"name": "is_default",
					"type": "boolean",
					"required": false
				},
				{
					"name": "availability_zone_hints",
					"type": "array",
					"required": false,
					"entry_schema": "string",
					"inputable": true
				},
				{
					"name": "segments",
					"type": "array",
					"required": false,
					"entry_schema": "Segment",
					"inputable": true
				},
				{
					"name": "isPublic",
					"type": "boolean",
					"required": true
				},
				{
					"name": "additionalParamsForVl",
					"type": "map",
					"required": false
				}
			],
			"connections": {
				"Subnet": {
					"required": true,
					"multiple": true
				},
				"VNF": {
					"required": false,
					"multiple": true
				}
			}
		},
		"Subnet": {
			"type": "Subnet",
			"properties": [
				{
					"name": "name",
					"type": "string",
					"required": true
				},
				{
					"name": "description",
					"type": "string",
					"required": false
				},
				{
					"name": "ip_version",
					"type": "integer",
					"required": true,
					"valid_values": [
						4,
						6
					],
					"inputable": true
				},
				{
					"name": "cidr",
					"type": "string",
					"required": true,
					"inputable": true
				},
				{
					"name": "subnetId",
					"type": "string",
					"required": false,
					"inputable": true
				},
				{
					"name": "enable_dhcp",
					"type": "boolean",
					"required": false,
					"default": true
				},
				{
					"name": "dns_nameservers",
					"type": "array",
					"required": false,
					"entry_schema": "string"
				},
				{
					"name": "allocation_pools",
					"type": "array",
					"required": false,
					"entry_schema": "AllocationPool",
					"inputable": true
				},
				{
					"name": "host_routes",
					"type": "array",
					"required": false,
					"entry_schema": "Route",
					"inputable": true
				},
				{
					"name": "gateway_ip",
					"type": "string",
					"required": false,
					"inputable": true
				},
				{
					"name": "prefixlen",
					"type": "integer",
					"required": false
				},
				{
					"name": "ipv6_address_mode",
					"type": "string",
					"required": false
				},
				{
					"name": "ipv6_ra_mode",
					"type": "string",
					"required": false,
					"valid_values": [
						"slaac",
						"dhcpv6-stateful",
						"dhcpv6-stateless"
					]
				},
				{
					"name": "segment_id",
					"type": "string",
					"required": false,
					"inputable": true
				},
				{
					"name": "subnetpool_id",
					"type": "string",
					"required": false
				},
				{
					"name": "use_default_subnetpool",
					"type": "boolean",
					"required": false
				},
				{
					"name": "service_types",
					"type": "array",
					"required": false,
					"entry_schema": "string"
				},
				{
					"name": "dns_publish_fixed_ip",
					"type": "boolean",
					"required": false,
					"default": false
				},
				{
					"name": "need_create",
					"type": "boolean",
					"required": true,
					"default": true
				}
			],
			"connections": {
				"Network": {
					"required": true
				},
				"Router": {
					"required": false
				},
				"BGP": {
					"multiple": true,
					"required": false
				}
			}
		},
		"Router": {
			"type": "Router",
			"properties": [
				{
					"name": "name",
					"type": "string",
					"required": true
				},
				{
					"name": "description",
					"type": "string",
					"required": false
				},
				{
					"name": "routerId",
					"type": "string",
					"required": false,
					"description": "inputifdon'tneedcreate",
					"inputable": true
				},
				{
					"name": "admin_state_up",
					"type": "boolean",
					"required": false,
					"default": true
				},
				{
					"name": "distributed",
					"type": "boolean",
					"required": false
				},
				{
					"name": "ha",
					"type": "boolean",
					"required": false
				},
				{
					"name": "availability_zone_hints",
					"type": "array",
					"entry_schema": "string",
					"required": false
				},
				{
					"name": "service_type_id",
					"type": "string",
					"required": false
				},
				{
					"name": "flavor_id",
					"type": "string",
					"required": false
				},
				{
					"name": "external_gateway_info",
					"type": "object",
					"required": false,
					"entry_schema": "ExternalGatewayInfo"
				},
				{
					"name": "native_routes",
					"type": "array",
					"required": false,
					"entry_schema": "Route"
				},
				{
					"name": "additionalParamsForVr",
					"map": "string",
					"required": true
				},
				{
					"name": "need_create",
					"type": "boolean",
					"required": true,
					"default": true
				},
				{
					"name": "isPublic",
					"type": "string",
					"required": true,
					"default": true
				}
			],
			"connections": {
				"Subnet": {
					"required": false,
					"multiple": true
				},
				"VNF": {
					"required": false,
					"multiple": true
				},
				"StaticRoute": {
					"required": false,
					"multiple": true
				},
				"ECMP": {
					"required": false,
					"multiple": true
				},
				"BGP": {
					"required": false,
					"multiple": true
				},
				"VPC": {
					"required": false,
					"multiple": true
				}
			}
		},
		"StaticRoute": {
			"type": "StaticRoute",
			"properties": [
				{
					"name": "destination",
					"type": "string",
					"required": true,
					"inputable": true
				},
				{
					"name": "nexthop",
					"type": "string",
					"required": true,
					"inputable": true
				},
				{
					"name": "ip_version",
					"type": "integer",
					"required": true,
					"valid_values": [
						4,
						6
					]
				},
				{
					"name": "type",
					"type": "integer",
					"required": true,
					"valid_values": [
						401,
						402
					],
					"description": "401:nexthopisVMport,402:nexthopisindirectlyaddress"
				},
				{
					"name": "bfd",
					"type": "boolean",
					"required": true,
					"default": false
				},
				{
					"name": "source_ips",
					"type": "array",
					"required": false,
					"entry_schema": "string",
					"inputable": true,
					"description": "mantarywhenbfdistrue"
				},
				{
					"name": "isPublic",
					"type": "boolean",
					"required": true,
					"default": false
				}
			],
			"connections": {
				"Router": {
					"required": true
				}
			}
		},
		"ECMP": {
			"type": "ECMP",
			"properties": [
				{
					"name": "loopback_ip",
					"type": "array",
					"required": true,
					"entry_schema": "ECMPLoopbackIp",
					"inputable": true
				},
				{
					"name": "bfd",
					"type": "boolean",
					"required": true,
					"default": false
				},
				{
					"name": "source_ips",
					"type": "array",
					"required": false,
					"entry_schema": "string",
					"inputable": true,
					"description": "mantarywhenbfdistrue"
				},
				{
					"name": "isPublic",
					"type": "boolean",
					"required": true,
					"default": false
				}
			],
			"connections": {
				"Router": {
					"required": true
				},
				"CP": {
					"required": true
				}
			}
		},
		"BGP": {
			"type": "BGP",
			"properties": [
				{
					"name": "name",
					"type": "string",
					"required": true
				},
				{
					"name": "description",
					"type": "string",
					"required": false
				},
				{
					"name": "local_as_number",
					"type": "string",
					"required": true,
					"inputable": true
				},
				{
					"name": "ip_version",
					"type": "integer",
					"required": true,
					"valid_values": [
						4,
						6
					]
				},
				{
					"name": "peer_ip_address",
					"type": "string",
					"required": true,
					"inputable": true
				},
				{
					"name": "peer_as_number",
					"type": "string",
					"required": true,
					"inputable": true
				},
				{
					"name": "suppress",
					"type": "boolean",
					"required": false,
					"default": false
				},
				{
					"name": "isPublic",
					"type": "boolean",
					"required": true,
					"default": false
				}
			],
			"connections": {
				"Router": {
					"required": true
				},
				"Subnet": {
					"required": false
				}
			}
		},
		"VPC": {
			"type": "VPC",
			"properties": [
				{
					"name": "name",
					"type": "string",
					"required": true
				},
				{
					"name": "description",
					"type": "string",
					"required": false
				},
				{
					"name": "local_cidrs",
					"type": "array",
					"entry_schema": "string",
					"required": true,
					"inputable": true
				},
				{
					"name": "local_firewall_enable",
					"type": "boolean",
					"required": true
				},
				{
					"name": "peer_cidrs",
					"type": "array",
					"entry_schema": "string",
					"required": true,
					"inputable": true
				},
				{
					"name": "peer_firewall_enable",
					"type": "boolean",
					"required": true
				},
				{
					"name": "mode",
					"type": "string",
					"required": true,
					"valid_values": [
						0,
						1
					]
				},
				{
					"name": "priority",
					"type": "string",
					"required": false
				},
				{
					"name": "isPublic",
					"type": "boolean",
					"required": true,
					"default": false
				}
			],
			"connections": {
				"LocalRouter": {
					"required": true
				},
				"PeerRouter": {
					"required": true
				}
			}
		},
		"TapService": {
			"type": "TapService",
			"properties": [
				{
					"name": "name",
					"type": "string",
					"required": true
				},
				{
					"name": "description",
					"type": "string",
					"required": true
				},
				{
					"name": "remote_v4ip",
					"type": "string",
					"required": false,
					"inputable": true
				},
				{
					"name": "remote_v6ip",
					"type": "string",
					"required": false,
					"inputable": true
				},
				{
					"name": "remote_port_id",
					"type": "string",
					"required": false,
					"inputable": true
				}
			],
			"connections": {
				"VNF": {
					"required": true
				},
				"TapFlow": {
					"required": false,
					"multiple": true
				}
			}
		},
		"TapFlow": {
			"type": "TapFlow",
			"properties": [
				{
					"name": "name",
					"type": "string",
					"required": true
				},
				{
					"name": "description",
					"type": "string",
					"required": true
				},
				{
					"name": "direction",
					"type": "string",
					"required": true,
					"valid_values": [
						"IN",
						"OUT",
						"BOTH"
					]
				},
				{
					"name": "destination_v4ip_prefix",
					"type": "string",
					"required": false,
					"inputable": true
				},
				{
					"name": "destination_v6ip_prefix",
					"type": "string",
					"required": false,
					"inputable": true
				}
			],
			"connections": {
				"TapService": {
					"required": true
				},
				"CP": {
					"required": true
				}
			}
		}
	},
	"datatypes": {
		"Segment": {
			"description": "segments",
			"properties": [
				{
					"name": "network_type",
					"type": "string",
					"required": true
				},
				{
					"name": "provider_physical_network",
					"type": "string",
					"required": true
				},
				{
					"name": "segmentation_id",
					"type": "string",
					"required": false
				}
			]
		},
		"AllocationPool": {
			"description": "allocaion_pool",
			"properties": [
				{
					"name": "start",
					"type": "string",
					"required": true
				},
				{
					"name": "end",
					"type": "string",
					"required": true
				}
			]
		},
		"Route": {
			"description": "host_routes",
			"properties": [
				{
					"name": "destination",
					"type": "string",
					"required": true
				},
				{
					"name": "nexthop",
					"type": "string",
					"required": true
				}
			]
		},
		"ExternalGatewayInfo": {
			"description": "externalgatewayinfoofvRouter",
			"properties": [
				{
					"name": "network",
					"type": "string",
					"required": true,
					"description": "itemidofexternalnetwork"
				},
				{
					"name": "enable_snat",
					"type": "boolean",
					"required": true,
					"default": false
				},
				{
					"name": "external_fixed_ips",
					"type": "array",
					"required": true,
					"entry_schema": "ExternalFixedIp"
				}
			]
		},
		"ExternalFixedIp": {
			"properties": [
				{
					"name": "subnet",
					"type": "string",
					"required": true,
					"description": "subnetitemidofexternalsubnet"
				},
				{
					"name": "ip_address",
					"type": "string",
					"required": true,
					"inputalbe": true
				}
			]
		},
		"ECMPLoopbackIp": {
			"description": "ECMPloopbackip,atleastoneofv4_ipandv6_ipismust.",
			"properties": [
				{
					"name": "v4_ip",
					"type": "string"
				},
				{
					"name": "v6_ip",
					"type": "string"
				}
			]
		}
	}
};