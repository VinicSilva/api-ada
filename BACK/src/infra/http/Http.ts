export default interface Http {
	use?(url: string, callback: Function): void;
	route(method: string, url: string, callback: Function): void;
	listen(port: number): void;
}