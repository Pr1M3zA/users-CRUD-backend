type ServiceResponse<T> = {
   message: string;
   status: number;
   data?: T;
}

export type Service<T> = () => Promise <ServiceResponse<T>>;
export type ServiceWithProps<T, P> = (props: P) => Promise <ServiceResponse<T>>;