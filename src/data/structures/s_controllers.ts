export interface I_ControllerBase {
	CONTROLLER_NAME: string;
	
	//Some controllers may stores some data locally, thus this function can be used to delete that data.
	deleteLocalData?: () => void;
}
