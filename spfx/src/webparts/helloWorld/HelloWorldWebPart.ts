import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {
    let apiUrl = 'https://localhost:44361/';

    this.domElement.innerHTML = `
      <div style="display:none"><iframe src="${apiUrl}"></iframe></div>`;


    this.domElement.querySelector("iframe").addEventListener("load", (): void => {

      this.context.httpClient.fetch(`${apiUrl}api/clients`,
        HttpClient.configurations.v1, {
          credentials: "include",
          method: "GET"
        })
        .then((response: HttpClientResponse): Promise<any[]> => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.resolve(null);
          }
        })
        .then((data: any[]): void => {
          console.log(data);

          this.context.httpClient.fetch(`${apiUrl}api/clients`,
            HttpClient.configurations.v1, {
              credentials: "include",
              method: "POST",
              body: JSON.stringify({data: 'mydata'})
            })
            .then((response: HttpClientResponse): Promise<any[]> => {
              if (response.ok) {
                return response.json();
              } else {
                return Promise.resolve(null);
              }
            }).then(console.log).catch(console.log)
        })
        .catch((error: any): void => {
          console.log(error);
        });
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
