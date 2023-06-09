import testInfo from '@/entity/testInfo'

export class TestInfoService {
  addTest() {
    return testInfo.crudInsert().getSql()
  }
}