import { Request, Response, Router, json } from 'express';
import { checkSchema } from 'express-validator';
import validateRequest from '../middleware/validateRequest';
import CreateUrlSchema from './schema/createUrlSchema';
import createUrlService from './services/createUrlService';
import updateUrlService from './services/updateUrlService';
import redirectUrlService from './services/redirectUrlService';

const Urls = Router();
Urls.use(json());

Urls.post('/', checkSchema(CreateUrlSchema), validateRequest, async (req: Request, res: Response) => {
   const { status, ...rest } = await createUrlService(req.body);
   res.status(status).json(rest.data?.shortUrl || rest);
});

// Activar URL
Urls.put('/activate/:id', async (req: Request, res: Response) => {
   const { id } = req.params;
   const { status, ...rest } = await updateUrlService({ id: Number(id), data: { isActive: true } });
   res.status(status).json(rest);
});

// Desactirar URL
Urls.put('/deactivate/:id', async (req: Request, res: Response) => {
   const { id } = req.params;
   const { status, ...rest } = await updateUrlService({ id: Number(id), data: { isActive: false } });
   res.status(status).json(rest);
});

// Consultar y redirigir URL acortada
Urls.get('/:shortUrl', async (req: Request, res: Response) => {
   const { shortUrl } = req.params;
   const result = await redirectUrlService({ shortUrl: String(shortUrl) });

   if (result.status === 200 && result.data) {
      return res.redirect(result.data.originalUrl);  // enviamos a la URL original
   }

   return res.status(result.status).json({ message: result.message });
});

export default Urls;
