"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SilentResultItem =
		exports.SilentCategoryItem =
		exports.SilentAreaDetectDynamicItem =
			void 0);
const UE = require("ue"),
	RedDotController_1 = require("../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class SilentAreaDetectDynamicItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Data = void 0),
			(this.T6e = void 0),
			(this.L6e = void 0),
			(this.D6e = void 0),
			(this.R6e = void 0);
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.T6e || (this.T6e = new SilentCategoryItem(this.GetItem(0))),
			this.L6e || (this.L6e = new SilentResultItem(this.GetItem(1)));
	}
	GetUsingItem(e) {
		if (e.SilentAreaDetectionData) {
			return this.GetItem(1).GetOwner();
		}
		return this.GetItem(0).GetOwner();
	}
	Update(e, t) {
		(this.Data = e),
			this.L6e.SetActive(!1),
			this.T6e.SetActive(!1),
			e.SilentAreaDetectionData
				? (this.L6e.SetActive(!0),
					this.L6e.Update(e.SilentAreaDetectionData),
					this.L6e.BindResultCallback(this.R6e))
				: (this.T6e.SetActive(!0),
					this.T6e.Update([e.SilentAreaTitleData, e.IsShow]),
					this.T6e.BindCategoryCallback(this.D6e));
	}
	BindClickCategoryCallback(e) {
		this.D6e = e;
	}
	BindClickResultCallback(e) {
		this.R6e = e;
	}
	ClearItem() {
		this.Destroy();
	}
	OnBeforeDestroy() {
		this.T6e && (this.T6e.Destroy(), (this.T6e = void 0)),
			this.L6e && (this.L6e.Destroy(), (this.L6e = void 0));
	}
}
exports.SilentAreaDetectDynamicItem = SilentAreaDetectDynamicItem;
class SilentCategoryItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.b5e = void 0),
			(this.U6e = void 0),
			(this.Pe = void 0),
			(this.A6e = !1),
			(this.OnClickExtendToggle = (e) => {
				(this.A6e = !this.A6e),
					this.U6e && this.U6e(this.Pe.TypeDescription, this.b5e, this.A6e);
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UISprite],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
	}
	OnStart() {
		(this.b5e = this.GetExtendToggle(0)),
			this.b5e.SetToggleState(0),
			this.b5e.OnPostAudioEvent.Bind((e) => {
				e && this.PostClickAudioEvent(e);
			}),
			this.b5e.OnPostAudioStateEvent.Bind((e, t) => {
				t && this.PostClickAudioEvent(t);
			});
	}
	OnBeforeDestroy() {
		this.P6e(),
			(this.Pe = void 0),
			this.b5e.OnPostAudioEvent.Unbind(),
			this.b5e.OnPostAudioStateEvent.Unbind();
	}
	Update(e) {
		(this.Pe = e[0]),
			(this.A6e = e[1]),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.TitleName),
			this.GetExtendToggle(0).SetToggleState(this.A6e ? 1 : 0, !1),
			this.x6e();
	}
	x6e() {
		RedDotController_1.RedDotController.BindRedDot(
			"AdventureFirstAwardCategory",
			this.GetItem(3),
			void 0,
			this.Pe.TypeDescription,
		);
	}
	P6e() {
		this.Pe &&
			RedDotController_1.RedDotController.UnBindGivenUi(
				"AdventureFirstAwardCategory",
				this.GetItem(3),
				this.Pe.TypeDescription,
			);
	}
	RefreshRedDot(e) {
		this.GetItem(3).SetUIActive(e);
	}
	BindCategoryCallback(e) {
		this.U6e = e;
	}
}
exports.SilentCategoryItem = SilentCategoryItem;
class SilentResultItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.w6e = void 0),
			(this.Pe = void 0),
			(this.b5e = void 0),
			(this.OnClickExtendToggle = (e) => {
				this.w6e && this.w6e(this.Pe.Conf.Id, this.b5e);
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UITexture],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UISprite],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
	}
	OnStart() {
		(this.b5e = this.GetExtendToggle(0)),
			this.b5e.SetToggleState(0),
			this.b5e.OnPostAudioEvent.Bind((e) => {
				e && this.PostClickAudioEvent(e);
			}),
			this.b5e.OnPostAudioStateEvent.Bind((e, t) => {
				t && this.PostClickAudioEvent(t);
			});
	}
	OnBeforeDestroy() {
		this.P6e(),
			(this.Pe = void 0),
			this.b5e.OnPostAudioEvent.Unbind(),
			this.b5e.OnPostAudioStateEvent.Unbind();
	}
	Update(e) {
		this.Pe = e;
		var t = this.GetText(4),
			i = e.Conf.Name;
		LguiUtil_1.LguiUtil.SetLocalTextNew(t, i),
			this.GetText(3).SetUIActive(!1),
			this.GetTexture(1).SetUIActive(!1),
			(i = this.GetItem(2));
		e.IsLock
			? (i.SetUIActive(!0), t.SetUIActive(!1))
			: (i.SetUIActive(!1), t.SetUIActive(!0)),
			this.GetSprite(5).SetUIActive(e.IsTargeting),
			this.x6e();
	}
	x6e() {
		RedDotController_1.RedDotController.BindRedDot(
			"AdventureFirstAwardResult",
			this.GetItem(6),
			void 0,
			this.Pe.Conf.Id,
		);
	}
	P6e() {
		this.Pe &&
			RedDotController_1.RedDotController.UnBindGivenUi(
				"AdventureFirstAwardResult",
				this.GetItem(6),
				this.Pe.Conf.Id,
			);
	}
	BindResultCallback(e) {
		this.w6e = e;
	}
}
exports.SilentResultItem = SilentResultItem;
