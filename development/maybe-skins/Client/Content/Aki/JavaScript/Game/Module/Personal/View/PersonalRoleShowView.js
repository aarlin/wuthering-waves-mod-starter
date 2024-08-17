"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalRoleShowView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	PersonalController_1 = require("../Controller/PersonalController"),
	PersonalRoleMediumItemGrid_1 = require("./PersonalRoleMediumItemGrid");
class PersonalRoleShowView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.xqe = void 0),
			(this.n4t = void 0),
			(this.s5i = 0),
			(this.R5i = 0),
			(this.U5i = 0),
			(this.A5i = void 0),
			(this.nNt = () => {
				var e = ModelManager_1.ModelManager.PersonalModel.GetRoleShowList(),
					i = e.length,
					t = [];
				if (0 === this.U5i) {
					for (let o = 0; o < i; o++) {
						var s = e[o];
						t.push(s.l3n);
					}
					t.push(this.s5i);
				} else if (2 === this.U5i)
					for (let s = 0; s < i; s++) {
						var o = e[s];
						o.l3n !== this.s5i && t.push(o.l3n);
					}
				else if (1 === this.U5i)
					for (let s = 0; s < i; s++) {
						var l = e[s];
						l.l3n === this.s5i
							? t.push(this.R5i)
							: l.l3n === this.R5i
								? t.push(this.s5i)
								: t.push(l.l3n);
					}
				PersonalController_1.PersonalController.SendRoleShowListUpdateRequest(
					t,
				),
					this.CloseMe();
			}),
			(this.Hke = (e, i, t) => {
				var s = new PersonalRoleMediumItemGrid_1.PersonalRoleMediumItemGrid();
				return (
					s.Initialize(i.GetOwner()),
					s.Refresh(e, !1, t),
					s.BindOnExtendToggleStateChanged(this.a5i),
					{ Key: t, Value: s }
				);
			}),
			(this.a5i = (e) => {
				this.A5i?.SetSelected(!1),
					(this.A5i = e.MediumItemGrid),
					this.A5i?.SetSelected(!0),
					(e = e.Data),
					this.Refresh(e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIText],
		]),
			(this.BtnBindInfo = [[1, this.nNt]]);
	}
	OnStart() {
		(this.R5i = this.OpenParam),
			(this.xqe = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(0),
				this.Hke,
			));
	}
	Refresh(e) {
		this.s5i = e;
		e = this.R5i === this.s5i;
		var i = ModelManager_1.ModelManager.PersonalModel.GetRoleShowList(),
			t =
				(this.GetButton(1).RootUIComp.SetUIActive(!0),
				this.IsRoleInShow(this.s5i));
		1 === i.length && t
			? this.GetButton(1).RootUIComp.SetUIActive(!1)
			: void 0 === this.R5i
				? t
					? this.omi(2)
					: this.omi(0)
				: e
					? this.omi(2)
					: this.omi(1);
	}
	omi(e) {
		this.U5i = e;
		var i = this.GetText(2);
		switch (e) {
			case 0:
				LguiUtil_1.LguiUtil.SetLocalText(i, "JoinText");
				break;
			case 2:
				LguiUtil_1.LguiUtil.SetLocalText(i, "GoDownText");
				break;
			case 1:
				LguiUtil_1.LguiUtil.SetLocalText(i, "ChangeText");
		}
	}
	IsRoleInShow(e) {
		var i = ModelManager_1.ModelManager.PersonalModel.GetRoleShowList(),
			t = i.length;
		let s = !1;
		for (let e = 0; e < t; e++)
			if (i[e].l3n === this.s5i) {
				s = !0;
				break;
			}
		return s;
	}
	OnAfterShow() {
		(this.n4t = ModelManager_1.ModelManager.RoleModel.GetRoleIdList()),
			0 < this.n4t.length &&
				(this.xqe.RefreshByData(this.n4t),
				(this.s5i = this.n4t[0]),
				(this.A5i = this.xqe.GetScrollItemList()[0]),
				this.A5i.SetSelected(!0),
				this.Refresh(this.s5i));
	}
	OnBeforeDestroy() {
		this.xqe && (this.xqe.ClearChildren(), (this.xqe = void 0));
	}
}
exports.PersonalRoleShowView = PersonalRoleShowView;
