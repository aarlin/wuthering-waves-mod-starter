"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneGameplayTipGrid = void 0);
const ue_1 = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
	LguiUtil_1 = require("../../../Util/LguiUtil");
class SceneGameplayTipGrid extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.OnClickPreviewCall = void 0),
			(this.d2o = void 0),
			(this.a1i = !1),
			(this.h1i = []),
			(this._2o = () => {
				this.OnClickPreviewCall?.();
			});
	}
	Initialize(e) {
		this.CreateThenShowByActor(e);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[1, ue_1.UIItem],
			[2, ue_1.UIItem],
			[0, ue_1.UIText],
			[3, ue_1.UIButtonComponent],
			[4, ue_1.UIItem],
		]),
			(this.BtnBindInfo = [[3, this._2o]]);
	}
	OnStart() {
		this.GetItem(2).SetUIActive(!1);
	}
	OnBeforeDestroy() {
		(this.h1i.length = 0), (this.OnClickPreviewCall = void 0);
	}
	Refresh(e, t, i = !1, s = !1, o = !1) {
		(this.d2o = e),
			i ? this.C2o(t) : this.qMi(t),
			this.GetItem(4)?.SetUIActive(o),
			this.Yhi(s);
	}
	SetBtnPreviewVisible(e) {
		this.GetButton(3).RootUIComp.SetUIActive(e);
	}
	Yhi(e = !1) {
		this.a1i = !!this.d2o && 0 < this.d2o.size;
		let t = 0;
		if (this.a1i) {
			var i = this.GetItem(2).GetOwner(),
				s = this.GetItem(1);
			let o = 0;
			for (const t of this.d2o) {
				let l = this.h1i[o];
				l ||
					((l =
						new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(
						LguiUtil_1.LguiUtil.DuplicateActor(i, s),
					),
					this.h1i.push(l)),
					l.RefreshByConfigId(t[0], t[1], void 0, e),
					l.SetActive(!0),
					o++;
			}
			t = this.d2o.size;
		}
		for (let e = t; e < this.h1i.length; ++e) this.h1i[e].SetActive(!1);
	}
	qMi(e) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), e);
	}
	C2o(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
	}
}
exports.SceneGameplayTipGrid = SceneGameplayTipGrid;
