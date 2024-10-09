import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DistributionPageComponent } from './pages/distribution-page/distribution-page.component';
import { MainComponent } from './pages/main/main.component';
import { DistributionsMenuComponent } from './pages/distributions-menu/distributions-menu.component';
import { DistributionMoldComponent } from './components/shared/distribution-mold/distribution-mold.component';

export const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            {
                path: '', component: MainComponent
            },
            {
                path: 'distributions', component: DistributionsMenuComponent, children: [
                    {
                        path: '', component: DistributionMoldComponent,
                    },
                    {
                        path: ':distribution', component: DistributionPageComponent
                    }
                ]
            }
        ]
    }

];

