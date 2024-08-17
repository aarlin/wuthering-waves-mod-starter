"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationSelectableCreator = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
class NavigationSelectableCreator {
	static Cwo(e) {
		let t;
		return (
			(t =
				e instanceof UE.UIExtendToggle
					? "Toggle"
					: e instanceof UE.UIButtonComponent
						? "Button"
						: e instanceof UE.UIScrollViewWithScrollbarComponent
							? "Scrollbar"
							: e instanceof UE.UISliderComponent
								? "Slider"
								: e instanceof UE.UIDraggableComponent
									? "DragComponent"
									: "Selectable"),
			[NavigationSelectableCreator.gwo.get(t), t]
		);
	}
	static fwo(e) {
		let t = e.GetComponentByClass(UE.UISelectableComponent.StaticClass());
		return (
			(t =
				(t =
					t || e.GetComponentByClass(UE.UIScrollViewComponent.StaticClass())) ||
				e.GetComponentByClass(UE.UIDraggableComponent.StaticClass())) ||
				((e = e.GetComponentByClass(UE.UIItem.StaticClass())),
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiNavigation",
						11,
						"监听组件挂载节点获取不到交互组件",
						["节点名", e.displayName],
					)),
			t
		);
	}
	static RegisterNavigationBehavior(e, t) {
		NavigationSelectableCreator.gwo.set(e, t);
	}
	static CreateNavigationBehavior(e, t) {
		e = this.fwo(e);
		let o,
			a = t;
		return (
			StringUtils_1.StringUtils.IsBlank(t) ||
				((o = NavigationSelectableCreator.gwo.get(t)), (a = t)),
			o || ((o = (t = this.Cwo(e))[0]), (a = t[1])),
			new o(e, a)
		);
	}
}
(exports.NavigationSelectableCreator = NavigationSelectableCreator).gwo =
	new Map();
