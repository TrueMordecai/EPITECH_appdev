import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("about.json")
  getAbout() {
    const d = Date.now()
    return ({
      "client": {
          "host": "127.0.0.1",
      },
      "server": {
          "current_time": {d},
          "services": [{
              "name": "cat",
              "widgets": [{
                  "name": "cat",
                  "description": "Get a cat photo, rrrr",
                  "params": [{
                      "name": "title",
                      "type": "string"
                  }, {
                      "name": "refresh",
                      "type": "number"
                  }, {
                      "name": "type",
                      "type": "string"
                  }]
              }],
          }, {
              "name": "league",
              "widgets": [{
                  "name": "profile",
                  "description": "Get league profile",
                  "params": [{
                      "name": "title",
                      "type": "string"
                  }, {
                      "name": "refresh",
                      "type": "number"
                  }, {
                      "name": "username",
                      "type": "string"
                  }, {
                      "name": "type",
                      "type": "string"
                  }]
              },{
                  "name": "rank",
                  "description": "Get league Rank one ine euw",
                  "params": [{
                      "name": "title",
                      "type": "string"
                  }, {
                      "name": "refresh",
                      "type": "number"
                  }, {
                      "name": "type",
                      "type": "string"
                  }]
              }]
          }]
      },
  })
  }

}
