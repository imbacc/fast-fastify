/* automatically generated by MySQLtoTS */

export namespace test {

	export interface app_info {
		id?: number; // auto_increment
		text?: string;
		version?: number;
		os?: number;
		ostext?: string;
		linkurl?: string;
	}

	export interface app_info_copy {
		id?: number; // auto_increment
		text?: string;
		version?: number;
		os?: number;
		ostext?: string;
		linkurl?: string;
	}

	export interface app_infos {
		id: string;
		text?: string;
		version?: number;
		os?: number;
		ostext?: string;
		linkurl?: string;
	}

	export interface test_info {
		id?: number; // auto_increment
		name?: string;
		text?: string;
	}

	export interface user_info {
		id?: number; // auto_increment
		username: string;
		password: string;
		create_time: number;
		num: number;
		state: number;
	}

}
