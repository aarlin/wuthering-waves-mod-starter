"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalEditView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	PersonalCardComponent_1 = require("./PersonalCardComponent"),
	PersonalHeadPhotoComponent_1 = require("./PersonalHeadPhotoComponent");
class PersonalEditView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Z4i = void 0),
			(this.e5i = void 0),
			(this.t5i = void 0),
			(this.g6t = void 0),
			(this.i5i = 0),
			(this.o5i = () => {
				this.e5i.SetActive(!0), this.Z4i.SetActive(!1);
			}),
			(this.r5i = () => {
				this.e5i.SetActive(!1), this.Z4i.SetActive(!0);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIExtendToggle],
			[3, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [
				[2, this.o5i],
				[3, this.r5i],
			]);
	}
	async OnBeforeStartAsync() {
		(this.i5i = this.OpenParam),
			(this.t5i = this.GetItem(0)),
			(this.g6t = this.GetItem(1)),
			(this.Z4i = new PersonalCardComponent_1.PersonalCardComponent(
				this.t5i,
				!1,
				ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData(),
			)),
			(this.e5i =
				new PersonalHeadPhotoComponent_1.PersonalHeadPhotoComponent()),
			await this.e5i.CreateThenShowByActorAsync(this.g6t.GetOwner());
		var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10061);
		this.GetExtendToggle(3).RootUIComp.SetUIActive(e),
			(this.i5i = e ? this.i5i : 0),
			1 === this.i5i
				? (this.GetExtendToggle(3).SetToggleState(1),
					this.GetExtendToggle(2).SetToggleState(0),
					this.r5i())
				: 0 === this.i5i &&
					(this.GetExtendToggle(3).SetToggleState(0),
					this.GetExtendToggle(2).SetToggleState(1),
					this.o5i());
	}
	OnBeforeDestroy() {
		(this.t5i = void 0),
			(this.g6t = void 0),
			this.Z4i.Destroy(),
			this.e5i.Destroy();
	}
}
exports.PersonalEditView = PersonalEditView;
