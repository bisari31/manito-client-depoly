import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import CakeDecorate from '@/pages/cake/decorate';
import CakeDetail from '@/pages/cake/detail';
import CakeForm from '@/pages/cake/form';
import CakeListPage from '@/pages/cake/list';
import CakeSetup from '@/pages/cake/setup';
import Contact from '@/pages/contact';
import ErrorPage from '@/pages/error-page';
import Home from '@/pages/home';
import KakaoRedirection from '@/pages/kakako-redirection';
import Landing from '@/pages/landing';
import Layout from '@/pages/layout';
import My from '@/pages/my';
import MySetting from '@/pages/my-setting';
import Rename from '@/pages/rename';
import RollingpaperDetail from '@/pages/rollingpaper/detail';
import RollingpaperList from '@/pages/rollingpaper/list';
import MessageEdit from '@/pages/rollingpaper/message-edit';
import MessageCreate from '@/pages/rollingpaper/messge-create';
import RollingpaperSetup from '@/pages/rollingpaper/setup';
import SetupIntro from '@/pages/setup-intro';
import Signup from '@/pages/signup';
import routes from '@/routes';

const router = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorPage />}>
        <Route path="/" element={<Landing />} />
        <Route path={routes.kakakoRedirection} element={<KakaoRedirection />} />
        <Route element={<Layout />}>
          <Route path={routes.signup} element={<Signup />} />
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.my.default} element={<My />} />
          <Route path={routes.my.setting()} element={<MySetting />} />
          <Route path={routes.my.contact()} element={<Contact />} />
          <Route path={routes.my.rename()} element={<Rename />} />
          <Route path={routes.setupIntro()} element={<SetupIntro />} />
          <Route
            path={routes.rollingpaper.list()}
            element={<RollingpaperList />}
          />
          <Route
            path={routes.rollingpaper.detail()}
            element={<RollingpaperDetail />}
          />
          <Route
            path={routes.rollingpaper.setup()}
            element={<RollingpaperSetup />}
          />
          <Route
            path={routes.rollingpaper.messageEdit()}
            element={<MessageEdit />}
          />
          <Route
            path={routes.rollingpaper.messageCreate()}
            element={<MessageCreate />}
          />
          <Route path={routes.cake.setup()} element={<CakeSetup />} />
          <Route path={routes.cake.list()} element={<CakeListPage />} />
          <Route path={routes.cake.decorate()} element={<CakeDecorate />} />
          <Route path={routes.cake.form()} element={<CakeForm />} />
          <Route path={routes.cake.detail()} element={<CakeDetail />} />
        </Route>
      </Route>,
    ),
  );

export default router;
