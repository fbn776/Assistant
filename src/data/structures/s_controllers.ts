export interface I_ControllerBase {
	//Some controllers may stores some data locally, thus this function can be used to delete that data.
	deleteLocalData?: () => void;
}
